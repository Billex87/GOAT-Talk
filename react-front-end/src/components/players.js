import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { useParams } from 'react-router-dom';
import './players.css';

// const MyFormatter = function(props) {
//   return <a href=
// }

const search = function (term, players) {
  // console.log('term', term)
  if (!term) {
    return players;
  } else {
    const results = [];
    players.map((player) => {

      if ((player.athlete.displayName).toLowerCase().indexOf((term).toLowerCase()) != -1) {
        results.push(player);
      }

    });
    return results;
  }
};


export default function Player(props) {

  const [loading, setLoading] = useState(true);

  const [players, setPlayers] = useState([]);

  // let { term } = useParams();
  // console.log('term', term);


  // useEffect(() => {axios.get('https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/statistics/byathlete?region=us&lang=en&contentorigin=espn&isqualified=true&page=1&limit=256&sort=general.avgMinutes%3Adesc')
  // .then((response) => {
  //   setPlayers(prev => ({
  //     ...prev,
  //     players: response.data
  //   }))
  //   setLoading(false)
  // })}, [])

  useEffect(() => {
    axios.get('https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/statistics/byathlete?region=us&lang=en&contentorigin=espn&isqualified=true&page=1&limit=256&sort=general.avgMinutes%3Adesc')
      //previously response was an object
      .then((response) => {
        console.log(response);
        const athletes = response.data.athletes;
        const promises = athletes.map((a) => {
          return axios.get(`https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/${a.athlete.id}/?region=us&lang=en&contentorigin=espn`);
        });
        Promise.all(promises)
          //now response is going to be an array of objects
          .then((data) => {
            console.log(data);
            const players = data.map((d) => {
              return {
                id: d.data.athlete.id,
                img: d.data.athlete.headshot.href,
                displayName: d.data.athlete.displayName,
                teamShortName: d.data.athlete.team.abbreviation,
                position: d.data.athlete.position.abbreviation,
                age: d.data.athlete.age,
                debutYear: d.data.athlete.debutYear,
                height: d.data.athlete.displayHeight,
                weight: d.data.athlete.displayWeight,
                jersey: d.data.athlete.jersey,
              };
            });
            setPlayers(players)
            setLoading(false)
            console.log('players', players)
          });
      });
  }, []);

  if (loading) {
    return (null);
  }

  // const allPlayersSearched = search(term, players.players.athletes);

  // let allPlayers;

  // if (!allPlayersSearched) {
  //   allPlayers = players.players.athlete;
  // } else {
  //   allPlayers = allPlayersSearched;
  // }


  const theme = createMuiTheme({
    typography: {
      fontSize: 35,
      color: 'white'
    },
  });

  //for simple data fields just specifying the field down below is good enough, say what the field info has, the name and the width
  //when we want the value to be more complicated we can use renderCell through Material UI, used to configure the data rows in the table in a more complex way
  const columns = [
    { field: 'id', hide: true },
    {
      field: 'displayName', headerName: 'NBA Players', width: 440, renderCell: (params) => {
        console.log('params', params)
        return (<a style={{ textDecoration: 'none', color: 'black' }} href={`/player/${params.row.id}`}><img style={{ verticalAlign: 'middle', width: '88px' }} src={params.row.img} />{params.row.displayName}</a>);
      }
    },
    //looking for the key name in the data above to make it work
    { field: 'position', headerName: 'Pos.', width: 120 },
    { field: 'teamShortName', headerName: 'Teams', width: 160 },
    { field: 'age', headerName: 'Age', width: 120 },
    { field: 'debutYear', headerName: 'Drafted', width: 170 },
    { field: 'height', headerName: 'Height', width: 160 },
    { field: 'weight', headerName: 'Weight', width: 170 },
  ];
  // const rows = [
  // ];

  // allPlayers.map((player) => {
  //   console.log(player);
  //   const playerObject = {
  //     id: player.athlete.id,
  //     img: player.athlete.headshot.href,
  //     displayName: player.athlete.displayName,
  //     teamShortName: player.athlete.teamShortName,
  //     position: player.athlete.position.abbreviation,
  //     age: player.athlete.age,
  //     debutYear: player.athlete.debutYear
  //   };
  //   rows.push(playerObject);
  // });
 
  return (
    <div style={{ height: 750, width: '95%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '1px' }}>
      <h1><img src={"/images/nba.png"} alt="logo" className="nbaLogo" /></h1>
      <MuiThemeProvider theme={theme}>
        <DataGrid className="dataGrid" rows={players} columns={columns} pageSize={20} disableColumnMenu={true} checkboxSelection={false} sortModel={[
          {
            field: 'displayName', sort: 'asc'
          }
        ]} />
      </MuiThemeProvider>
    </div>
  );
}