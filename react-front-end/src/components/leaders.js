import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import axios from 'axios';
import './leaders.css';


export default function Leaders(props) {

  // console.log('looping?')

  const [loading, setLoading] = useState(true);
  const [leagueLeaders, setleagueLeaders] = useState({});

  useEffect(() => {
    axios.get('https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/statistics/byathlete?region=us&lang=en&contentorigin=espn&isqualified=true&page=1&limit=250&sort=offensive.avgPoints%3Adesc')
    .then((response) => {
      setleagueLeaders(prev => ({
        ...prev,
        leagueLeaders: response.data
      }));
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  const headers = leagueLeaders.leagueLeaders.categories[1].labels.slice(0, 12);
  const players = leagueLeaders.leagueLeaders.athletes;

  const columns = [
    { field: 'id', hide: true },
    {
      field: 'displayName', headerName: 'Name', width: 240, renderCell: (params) => {
        return (<a style={{ textDecoration: 'none', color: 'black' }} href={`/player/${params.row.id}`}><img style={{ verticalAlign: 'middle', width: '48px' }} src={params.row.img} />{params.row.displayName}</a>);
      }
    },
    { field: 'TEAM', headerName: 'Team', width: 100 }
  ];

  headers.map((header) => {
    let headObj = {
      field: header, headerName: header, type: 'number', width: 100
    };
    columns.push(headObj);
  });

  const rows = [];

  players.map((player, index1) => {
    let playerObject = {
      id: player.athlete.id,
      displayName: player.athlete.displayName,
      TEAM: player.athlete.teamShortName,
      img: player.athlete.headshot.href,
      
    };
    headers.map((header, index2) => {
      playerObject[header] = player.categories[1].values[index2];
      console.log("Billy", player.categories[1].values[index2])
    });
    rows.push(playerObject);
  });

  const theme = createMuiTheme({
    typography: {
      fontSize: 12
    },
    palette: {
      type: "dark",
    }
  });

  // console.log(headers)
  // console.log(rows)
  // console.log(columns)


  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ height: 750, width: '95%', paddingLeft: '15px', marginBottom: '15px' }}>
        <h1><img src={"/images/nba.png"} alt="logo" className="Trophy" /></h1>
        <h1>Stat Leaders</h1>
        <MuiThemeProvider theme={theme}>
          <DataGrid rows={rows} columns={columns} pageSize={12} disableColumnMenu={true} checkboxSelection={false} />
        </MuiThemeProvider>
      </div>
    </div>
  );
}