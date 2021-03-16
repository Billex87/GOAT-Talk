import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

export default function PlayerOverview(props) {

  const columns = [
    { field: 'id', hide: true},
    { field: 'stats', headerName: 'Stats', width: 130},
  ]
  props.stats.labels.map((label) => {
    let labelObj = { field: label, headerName: label, width: 85};
    columns.push(labelObj);
  })
  const rows = []
  props.stats.splits.map((type, index) => {
    let typeObj = {};
    typeObj['id'] = index;
    typeObj['stats'] = type.displayName;
    type.stats.map((stat, index) => {
      typeObj[props.stats.labels[index]] = stat;
    })
    rows.push(typeObj)
  })

  const theme = createMuiTheme({
    typography: {
      fontSize: 12
    }})


  return(
    <div className="player-overview">
      <div className="next-game" style={{borderRadius: '10px', boxShadow: 'inset 0 0 10px #000000'}}>
        <h2 className="next-game-header">{props.nextGame.displayName}</h2>
        <div className="game-display">
          <div className="teams">
            <div className="name-record">
              <h2 className="teamName">{props.nextGame.league.events[0].competitors[0].name}</h2>
              <p className="record">{props.nextGame.league.events[0].competitors[0].record}</p>
            </div>
            <img style={{maxWidth: '2em 2em'}} src={`${props.nextGame.league.events[0].competitors[0].logo}`}/>
          </div>
          <h1>  vs  </h1>
          <div className="teams">
            <img style={{maxWidth: '2em 2em'}} src={`${props.nextGame.league.events[0].competitors[1].logo}`}/>
            <div className="name-record">
              <h2 className="teamName">{props.nextGame.league.events[0].competitors[1].name}</h2>
              <p className="record">{props.nextGame.league.events[0].competitors[1].record}</p>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className="overview-stats" style={{ height: 230, width: '85%', paddingTop: '15px'}}>
        <MuiThemeProvider theme={theme}>
          <DataGrid
            rows={rows} columns={columns} autoPageSize={true} hideFooterPagination={true} 
          />
        </MuiThemeProvider>
      </div>
      <div className="last_10">

      </div>
      
    </div>
  )
}



