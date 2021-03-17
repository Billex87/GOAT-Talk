import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { useParams } from 'react-router-dom';
import './players.css'

// const MyFormatter = function(props) {
//   return <a href=
// }

const search = function(term, players) {
  if (!term) {
    return players
  } else {
    const results = []
    players.map((player) => {

      if((player.athlete.displayName).toLowerCase().indexOf((term).toLowerCase()) != -1){
        results.push(player)
      }

    })
    return results
  }
}


export default function Player(props) {

  const [loading, setLoading] = useState(true)

  const [players, setPlayers] = useState({})

  let { term } = useParams();


  useEffect(() => {axios.get('https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/statistics/byathlete?region=us&lang=en&contentorigin=espn&isqualified=true&page=1&limit=256&sort=general.avgMinutes%3Adesc')
  .then((response) => {
    setPlayers(prev => ({
      ...prev,
      players: response.data
    }))
    setLoading(false)
  })}, [])

  if(loading){
    return(null)
  }

  const allPlayersSearched = search(term, players.players.athletes)

  let allPlayers

  if (!allPlayersSearched) {
    allPlayers = players.players.athlete;
  } else {
    allPlayers = allPlayersSearched;
  }


  const theme = createMuiTheme({
    typography: {
      fontSize: 30,
    },
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  })

  const columns = [
    { field: 'id', hide: true},
    {field: 'displayName', headerName: 'Name', width: 350, renderCell: (params) => {
      return(<a style={{textDecoration: 'none', color: 'blue'}} href={`/player/${params.row.id}`}><img style={{verticalAlign: 'middle', width: '88px'}} src={params.row.img}/>{params.row.displayName}</a>)
    }},
    {field: 'position', headerName: 'Position', width: 150},
    {field: 'teamShortName', headerName: 'Teams', width: 150,},
    {field: 'age', headerName: 'Age'},
    {field: 'debutYear', headerName: 'Drafted', width: 150}
  ]
  const rows = [
  ]

  allPlayers.map((player) => {
    console.log(player);
    const playerObject = {
      id: player.athlete.id,
      img: player.athlete.headshot.href,
      displayName: player.athlete.displayName,
      teamShortName: player.athlete.teamShortName,
      position: player.athlete.position.abbreviation,
      age: player.athlete.age,
      debutYear: player.athlete.debutYear
    }
    rows.push(playerObject)
  })
  // console.log(rows)

  return (
    <div style={{color: 'teal', height: 750, width: '80%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '1px'}}>
     <h1><img  src={"/images/nba.png"} alt="logo" className="nbaLogo"/></h1>
      <MuiThemeProvider theme={theme}>
        <DataGrid rows={rows} columns={columns} pageSize={20} disableColumnMenu={true} checkboxSelection={false} sortModel={[
          {
            field: 'displayName', sort: 'asc'
          }
        ]}/>
      </MuiThemeProvider>
    </div>
  );
}