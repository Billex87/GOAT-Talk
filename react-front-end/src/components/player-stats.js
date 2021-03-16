import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

export default function PlayerStats(props) {

  const avgColumns = [
    { field: 'id', hide: true },
    {field: 'Season', headerName: 'Season', width: 130 }
  ]
  props.stats.categories[0].labels.map((label) => {
    avgColumns.push({ field: label, headerName: label, width: 85 })
  });

  const avgRows= []
  
  props.stats.categories[0].statistics.map((season, index) => {
    let rowObj = { 'id': index, 'Season': season.season.displayName }
    season.stats.map((stat, index) => {

      rowObj[avgColumns[index + 2].field] = stat;
    })
    avgRows.push(rowObj);
  })

  const totalsColumns = [
    { field: 'id', hide: true },
    {field: 'Season', headerName: 'Season', width: 130 }
  ];

  props.stats.categories[1].labels.map((label) => {
    totalsColumns.push({ field: label, headerName: label, width: 85 })
  });

  const totalsRows = []

  props.stats.categories[1].statistics.map((season, index) => {
    let rowObj = { 'id': index, 'Season': season.season.displayName }
    season.stats.map((stat, index) => {

      rowObj[totalsColumns[index + 2].field] = stat;
    })
    totalsRows.push(rowObj);
  })

  const miscColumns = [
    { field: 'id', hide: true },
    {field: 'Season', headerName: 'Season', width: 130 }
  ];

  props.stats.categories[2].labels.map((label) => {
    miscColumns.push({ field: label, headerName: label, width: 110 })
  });

  const miscRows = []

  props.stats.categories[2].statistics.map((season, index) => {
    let miscObj = { 'id': index, 'Season': season.season.displayName }
    season.stats.map((stat, index) => {

      miscObj[miscColumns[index + 2].field] = stat;
    })
    miscRows.push(miscObj);
  })


  const theme = createMuiTheme({
    typography: {
      fontSize: 12
    }})

  const gloss1 = props.stats.glossary.slice(0, 9);
  const gloss2 = props.stats.glossary.slice(10, 19);
  const gloss3 = props.stats.glossary.slice(20, 28);



  return(
    <div className="player-stats" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <div className="season-type-switcher">

      </div>
      <h2 className="tats-title">Averages</h2>
      <div className="averages" style={{ height: 750, width: '90%', paddingLeft: '15px', paddingBottom: '15px'}}>
        <MuiThemeProvider theme={theme}>
          <DataGrid
            rows={avgRows} columns={avgColumns} 
          />
        </MuiThemeProvider>
      </div>
      <h2 className="stats-title">Totals</h2>
      <div className="totals" style={{ height: 750, width: '80%', paddingLeft: '15px', paddingBottom: '15px'}}>
        <MuiThemeProvider theme={theme}>
          <DataGrid
            rows={totalsRows} columns={totalsColumns} 
          />
        </MuiThemeProvider>
      </div>
      <h2 className="stats-title">Miscellaneous</h2>
      <div className="misc" style={{ height: 750, width: '76%', paddingLeft: '15px', paddingBottom: '15px'}}>
        <MuiThemeProvider theme={theme}>
          <DataGrid
            rows={miscRows} columns={miscColumns}
          />
        </MuiThemeProvider>
      </div>
      <div className="stats-title">Glossary</div>
      <div className="glossary">
        <div className="row">
          <table style={{width: '90%'}} >
            <tbody>
              {gloss1.map((term) => {
                return (
                  <tr>
                    <td>{term.abbreviation}: {term.displayName}</td>
                  </tr>
                )})}
            </tbody>
          </table>
        </div>
        <div className="row">
          <table style={{width: '90%'}} >
            <tbody>
              {gloss2.map((term) => {
                return (
                  <tr>
                    <td>{term.abbreviation}: {term.displayName}</td>
                  </tr>
                )})}
            </tbody>
          </table>
        </div>
        <div className="row">
          <table style={{width: '90%'}} >
            <tbody>
              {gloss3.map((term) => {
                return (
                  <tr>
                    <td>{term.abbreviation}: {term.displayName}</td>
                  </tr>
                )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}