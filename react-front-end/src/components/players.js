import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import {
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { useParams } from 'react-router-dom';
import './players.css';

const search = function (term, players) {
  if (!term) {
    return players;
  } else {
    const results = [];
    players.map((player) => {

      if ((player.displayName).toLowerCase().indexOf((term).toLowerCase()) != -1) {
        results.push(player);
      }

    });
    return results;
  }
};

export default function Player(props) {

  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  let { term } = useParams();

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
            const players = data.map((d) => {
              return {
                id: d.data.athlete.id,
                img: d.data.athlete.headshot.href,
                displayName: d.data.athlete.displayName,
                teamShortName: d.data.athlete.team.name,
                position: d.data.athlete.position.abbreviation,
                age: d.data.athlete.age,
                debutYear: d.data.athlete.displayDraft,
                height: d.data.athlete.displayHeight,
                weight: d.data.athlete.displayWeight,
                jersey: d.data.athlete.displayDraft,
                logo: d.data.athlete.team.logos[0].href,
              };
            });
            setPlayers(players);
            setLoading(false);
            console.log('players', players);
          });
      });
  }, []);

  if (loading) {
    return (null);
  }

  const allPlayersSearched = search(term, players);

  let allPlayers;

  if (!allPlayersSearched) {
    allPlayers = players;
  } else {
    allPlayers = allPlayersSearched;
  }

  const tableHeights = (rows) => {
    return (rows.length * 52) + 145;
  };

  const theme = createMuiTheme({
    typography: {
      fontSize: 35,
      color: 'white'
    },
  });

  const columns = [
    { field: 'id', hide: true },
    {
      field: 'displayName', headerName: 'NBA Players', width: 400, renderCell: (params) => {
        // console.log('HEADSHOT', params)
        return (<a style={{ textDecoration: 'none', color: 'black' }} href={`/player/${params.row.id}`}><img style={{ verticalAlign: 'middle', width: '98px' }} src={params.row.img} />{params.row.displayName}</a>);
      }
    },
    //looking for the key name in the data above to make it work
    { field: 'position', headerName: 'Pos.', width: 100 },
    {
      field: 'logo', headerName: 'Logo', width: 160, renderCell: (params) => {
        // console.log('LOGO', params)
        return (<a style={{ textDecoration: 'none', color: 'black' }} href={`/player/${params.row.id}`}><img style={{ verticalAlign: 'middle', width: '88px' }} src={params.row.logo}/></a>);
      }
    },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'debutYear', headerName: 'Drafted', width: 280 },
    { field: 'height', headerName: 'Height', width: 140 },
    { field: 'weight', headerName: 'Weight', width: 170 },
  ];
 
  return (
    <div style={{ height: tableHeights(allPlayers.slice(0, 20)), width: '95%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '1px' }}>
      <h1><img src={"/images/nba.png"} alt="logo" className="nbaLogo" /></h1>
      <MuiThemeProvider theme={theme}>
        <DataGrid className="dataGrid" rows={allPlayers} pageSize={20} columns={columns} disableColumnMenu={true} checkboxSelection={false} sortModel={[
          {
            field: 'displayName', sort: 'asc'
          }
        ]} />
      </MuiThemeProvider>
    </div>
  );
}