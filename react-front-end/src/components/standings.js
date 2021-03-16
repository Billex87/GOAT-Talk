import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import axios from 'axios';
import './standings.css'


export default function Standings(props) {

  const [leagueStandings, setleagueStandings] = useState({
    leagueStandings: {}
  })

  useEffect(() => {axios.get('https://site.web.api.espn.com/apis/v2/sports/basketball/nba/standings?region=us&lang=en&contentorigin=espn&type=0&level=2&sort=playoffseed%3Aasc')
  .then((response) => {
    setleagueStandings(prev => ({
      ...prev,
      leagueStandings: response.data
    }))
  })}, [])
  
  //Organize response data from ESPN
  const nba = leagueStandings.leagueStandings.children
  console.log(nba)

  let westConf = {};
  let eastConf = {};

  for (const x in nba) {
    let west = nba[x]
    westConf = west
    let east = nba[0]
    eastConf = east
  }

  const westStandings = westConf.standings;
  const eastStandings = eastConf.standings;

  const westArray = [];
  const eastArray = [];

  for (const wTeam in westStandings) {
    westArray.push(westStandings[wTeam])
  }
  for (const eTeam in eastStandings) {
    eastArray.push(eastStandings[eTeam])
  }

  const finalWest = westArray[6];
  const finalEast = eastArray[6];

  let formattedWest = [];
  let formattedEast = [];

  if (finalWest) {
    formattedWest = finalWest.map(team => {
      return {
        id: team.stats[0].value,
        img: team.team.logos[0].href,
        rank: team.stats[0].value,
        name: team.team.displayName,
        wins: team.stats[1].value,
        losses: team.stats[2].value,
        winpct: team.stats[3].value.toFixed(3),
        gb: team.stats[4].value,
        ppg: team.stats[5].value.toFixed(1),
        pointsAgainst: team.stats[6].value.toFixed(1),
        diff: team.stats[7].value.toFixed(1),
        streak: team.stats[8].value,
        divPct: team.stats[9].value.toFixed(3),
        leaguePct: team.stats[10].value.toFixed(3),
        splits: team.stats[11].summary,
        home: team.stats[12].summary,
        road: team.stats[13].summary,
        div: team.stats[14].summary,
        conf: team.stats[15].summary,
        lastten: team.stats[16].summary,
      }
    })
  }

  if (finalEast) {
    formattedEast = finalEast.map(team => {
      return {
        id: team.stats[0].value,
        img: team.team.logos[0].href,
        rank: team.stats[0].value,
        name: team.team.displayName,
        wins: team.stats[1].value,
        losses: team.stats[2].value,
        winpct: team.stats[3].value.toFixed(3),
        gb: team.stats[4].value,
        ppg: team.stats[5].value.toFixed(1),
        pointsAgainst: team.stats[6].value.toFixed(1),
        diff: team.stats[7].value.toFixed(1),
        streak: team.stats[8].value,
        divPct: team.stats[9].value.toFixed(3),
        leaguePct: team.stats[10].value.toFixed(3),
        home: team.stats[12].summary,
        road: team.stats[13].summary,
        div: team.stats[14].summary,
        conf: team.stats[15].summary,
        lastten: team.stats[16].summary,
      }
    })
  }


  const columns = [
    { field: 'id', hide: true},
    { field: 'rank', headerName: 'Rank', width: 63 },
    {field: 'img', headerName: 'Team', width: 68, renderCell: (params) => {
      return(<img style={{verticalAlign: 'middle', width: '38px'}} src={params.row.img}/>)
    }},
    // { field: 'img', headerName: 'Logo', width: 60},
    { field: 'name', headerName: 'Name', width: 195},
    { field: 'wins', headerName: 'W', width: 60 },
    { field: 'losses', headerName: 'L', width: 60 },
    { field: 'winpct', headerName: 'WIN %', width: 80 },
    { field: 'gb', headerName: 'GB', width: 60 },
    { field: 'ppg', headerName: 'PPG', width: 90 },
    { field: 'pointsAgainst', headerName: 'Opp. PPG', width: 100 },
    { field: 'diff', headerName: 'DIFF', width: 60 },
    { field: 'streak', headerName: 'Streak', width: 80 },
    { field: 'divPct', headerName: 'Div %', width: 100 },
    { field: 'leaguePct', headerName: 'League %', width: 100 },
    { field: 'road', headerName: 'ROAD', width: 100 },
    { field: 'div', headerName: 'vs. Div', width: 120 },
    { field: 'conf', headerName: 'vs. Conf', width: 120 },
    { field: 'lastten', headerName: 'L10', width: 120 }
  ];

  const theme = createMuiTheme({
    typography: {
      fontSize: 12,
    }
  })

  return (
    <div style={{ height: 750, width: '89%', paddingLeft: '65px', paddingBottom: '15px'}}>
      <h1>2020-21 Season Standings</h1>
      <h2>Western Conference</h2>
      <MuiThemeProvider theme={theme}>
        <DataGrid rows={formattedWest} columns={columns} pageSize={20} checkboxSelection disableColumnMenu={true} checkboxSelection={false} />
      </MuiThemeProvider>
      <h2>Eastern Conference</h2>
      <MuiThemeProvider theme={theme}>
        <DataGrid rows={formattedEast} columns={columns} pageSize={20} checkboxSelection disableColumnMenu={true} checkboxSelection={false} />
      </MuiThemeProvider>
    </div>
  );
}