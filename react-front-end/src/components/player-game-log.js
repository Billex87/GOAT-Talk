import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

export default function PlayerGameLog(props) {

  const gamesArray = [];
  for(const game in props.gameLog.events) {
    // console.log("game", props.gameLog.events[game])
    gamesArray.push(props.gameLog.events[game])
  }
  const reversedArray = gamesArray.reverse();
  console.log(typeof reversedArray[1].gameDate, reversedArray[1].gameDate)
  


  const columns = [
    { field: 'id', hide: true},
    {field: 'gameData', headerName: 'Game', width: 300, renderCell: (params) => {
      let id = params.row.id;
      // console.log("ROW ID",id)
      // let scoreArray = reversedArray[id].score.split('-')
      let splitDate = reversedArray[id].gameDate.split('T')
      let displayDate = splitDate[0]
      // console.log("score array", scoreArray.reverse())
      let teamImage = reversedArray[id].team.logo
      let separators = [' ', '-']
      let splitScore = (reversedArray[id].score.split(new RegExp(separators.join('|'),'g')))
      // console.log(splitScore)
      let flippedScore = (`${splitScore[1]}-${splitScore[0]} ${(splitScore[2]) ? (splitScore[2]) : ''}`)
      let opponentUrl = reversedArray[id].opponent.logo;
      let atVs = reversedArray[id].atVs;
      let playerTeamWon = reversedArray[id].gameResult;
      let displayedScore = (reversedArray[id].gameResult === "W") ? reversedArray[id].score : flippedScore;
      return(
      <div style={{display: 'flex', justifyContent: 'space-around', width: 250}}>
        <div style={{ width: 100 }}>
        {displayDate} 
        </div> 
        <div style={{ width: 100 }}>
          <img style={{verticalAlign: 'middle'}} src={teamImage}/> 
          {atVs} 
          <img style={{verticalAlign: 'middle'}} src={opponentUrl}/>
        </div>
        <div style={{fontWeight: 'bold', width: 100}} >
          {playerTeamWon}  {displayedScore}
        </div>
      </div>
      )
    }},
  ]

  props.gameLog.labels.map(obj => {
    if(obj === 'FT' || 'FG'  || '3PT') {
        let tempObj = {
          field: obj,
          headerName: obj,
          width: 65
        } 
      columns.push(tempObj);
      
    } else {
        let tempObj = {
        field: obj,
        headerName: obj,
        width: 65,
        type: 'number'
      }
      columns.push(tempObj);
      
    }
  })



  let rows = [];

  props.gameLog.seasonTypes[0].categories[0].events.map((game, index) => {
    let tempObj = { 'id': index };
    game.stats.map((stat, index2)=> {
      tempObj[columns[index2 + 2].field] = stat;
    })
    rows.push(tempObj);
  });
  const rowsLength1 = rows.length;

  props.gameLog.seasonTypes[0].categories[1].events.map((game, index) => {
    let tempObj = { 'id': index + rowsLength1 };
    game.stats.map((stat, index2)=> {
      tempObj[columns[index2 + 2].field] = stat;
    })
    rows.push(tempObj);
  });
  const rowsLength2 = rows.length;

  props.gameLog.seasonTypes[0].categories[2].events.map((game, index) => {
    let tempObj = { 'id': index + rowsLength2 };
    game.stats.map((stat, index2)=> {
      tempObj[columns[index2 + 2].field] = stat;
    })
    rows.push(tempObj);
  });
  // console.log(rows);

  const theme = createMuiTheme({
    typography: {
      fontSize: 12
    }})

  return(
    <div className="player-stats" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
      <h1>Player Game Log</h1>
      <div style={{ height: 950, width: '70%', paddingLeft: '75px', paddingBottom: '15px'}}>
        <MuiThemeProvider theme={theme}>
          <DataGrid rows={rows} columns={columns} rowHeight={35} pageSize={30} checkboxSelection disableColumnMenu={true} checkboxSelection={false} />
        </MuiThemeProvider>
      </div>
    </div>
  )
}
