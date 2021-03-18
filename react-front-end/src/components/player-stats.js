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

    // calculates FTA, 3PTA, FGA, TFGA, TSA for TS%
    rowObj.FTA = Math.round(((rowObj.FT.split('-')[1])*(rowObj.GP))* 100) / 100;

    rowObj["3PTA"] = Math.round(((rowObj["3PT"].split('-')[1])*(rowObj.GP))* 100) / 100;

    rowObj.FGA = Math.round(((rowObj.FG.split('-')[1])*(rowObj.GP))* 100) / 100;

    rowObj.TFGA = Math.round(rowObj.FGA + rowObj["3PTA"]);

    rowObj.TSA = rowObj.TFGA + 0.44 * rowObj.FTA;
    
    rowObj["TS%"] = Math.round(((rowObj.PTS * rowObj.GP)/(rowObj.TSA * 2))*100* 100) / 100;
    console.log(rowObj);
    

    // calculates PER
    rowObj.PER = Math.round(((((rowObj.FGA * (rowObj["FG%"] / 100)) * 85.910) +((rowObj.STL * rowObj.GP) * 53.897) + ((rowObj["3PTA"] * (rowObj["3P%"] / 100)) * 51.757) + ((rowObj.FTA * (rowObj["FT%"] / 100)) * 46.845) + ((rowObj.BLK * rowObj.GP) * 39.190) + ((rowObj.OR * rowObj.GP) * 39.190) + ((rowObj.AST * rowObj.GP) * 34.677) + ((rowObj.DR * rowObj.GP) * 14.707) - ((rowObj.PF * rowObj.GP) * 17.174) - ((rowObj.FTA - (rowObj.FTA * (rowObj["FT%"] / 100))) * 20.091) - ((rowObj.FGA - (rowObj.FGA * (rowObj["FG%"] / 100))) * 39.190) - ((rowObj.TO * rowObj.GP) * 53.897)) * (1/(rowObj.MIN * rowObj.GP)))* 100) / 100;

    // [ FGM x 85.910
    // Math.round(((rowObj.FGA * (rowObj["FG%"] / 100)) * 85.910)* 100) / 100
    // + Steals x 53.897
    // Math.round(((rowObj.STL * rowObj.GP) * 53.897)* 100) / 100
    // + 3PTM x 51.757
    // Math.round(((rowObj["3PTA"] * (rowObj["3P%"] / 100)) * 51.757)* 100) / 100
    // + FTM x 46.845
    // Math.round(((rowObj.FTA * (rowObj["FT%"] / 100)) * 46.845)* 100) / 100
    // + Blocks x 39.190
    // Math.round(((rowObj.BLK * rowObj.GP) * 39.190)* 100) / 100
    // + Offensive_Reb x 39.190
    // Math.round(((rowObj.OR * rowObj.GP) * 39.190)* 100) / 100
    // + Assists x 34.677
    // Math.round(((rowObj.AST * rowObj.GP) * 34.677)* 100) / 100
    // + Defensive_Reb x 14.707
    // Math.round(((rowObj.DR * rowObj.GP) * 14.707)* 100) / 100
    // - Foul x 17.174
    // Math.round(((rowObj.PF * rowObj.GP) * 17.174)* 100) / 100
    // - FT_Miss x 20.091
    // Math.round(((rowObj.FTA - (rowObj.FTA * (rowObj["FT%"] / 100))) * 20.091)* 100) / 100
    // - FG_Miss x 39.190
    // Math.round(((rowObj.FGA - (rowObj.FGA * (rowObj["FG%"] / 100))) * 39.190)* 100) / 100
    // - TO x 53.897 ]
    // Math.round(((rowObj.TO * rowObj.GP) * 53.897)* 100) / 100
    // x (1 / Minutes)
    // Math.round((1/(rowObj.MIN * rowObj.GP))* 100) / 100

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
    },
    palette: {
      type: "dark",
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