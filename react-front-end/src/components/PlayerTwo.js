import React, { useState } from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import './Player.css';

export default function PlayerTwo(props) {

  const [state, setState] = useState({
    playerName: null,
    playerStats: {}
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    getPlayerId();
    console.log(state.playerName);
  };

  const handleChange = (event) => {
    const replace = event.target.value.split(" ").join("_");
    if (replace.length > 0) {
      setState((prev) => ({
        ...prev,
        playerName: replace
      }));
    } else {
      alert("Please type players name!");
    }
  };

  const handleChangeSeason = (event) => {
    const replace = event.target.value.split(" ").join("_");
    if (replace.length > 0) {
      setState((prev) => ({
        ...prev,
        season: replace
      }));
    } else {
      alert("Please type players name!");
    }
  };

  const getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${state.playerName}`)
      .then(async res => {
        // console.log(res.data.data)
        if (typeof res.data.data[0] === "undefined") {
          alert("This player is either injured or hasn't played yet!");
        } else if (res.data.data.length > 1) {
          alert("Pleases specify the name more!");
        } else {
          await getPlayerStats(res.data.data[0].id, state.season);

        }
      }).catch(err => {
        console.log(err);
      });
  };

  const getPlayerStats = (playerId, season) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${playerId}`)
      .then(async res => {
        console.log(res.data.data);
        setState((prev) => ({
          ...prev,
          playerStats: res.data.data[0]
        }));
      }).catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="Player">
      <img src="images/lebron.png" alt="Lebron" />
      <form onSubmit={handleSubmit}>
        <SportsBasketballIcon />
        <label>
          <TextField
            id="standard-basic"
            type="text"
            value={state.value}
            onChange={handleChange}
            placeholder="Enter Player Name" />
            <TextField
            id="standard-basic"
            type="text"
            value={state.value}
            onChange={handleChangeSeason}
            placeholder="Enter Season" />
        </label>
        <Button type="submit" value="Submit" variant="contained" color="primary">Submit</Button>
      </form>
    Games Played: {state.playerStats["games_played"]}
      <br />
    Points Averaged: {state.playerStats["pts"]}
      <br />
    Rebounds Averaged: {state.playerStats["reb"]}
      <br />
    Assists Averaged: {state.playerStats["ast"]}
      <br />
    Steals Averaged: {state.playerStats["stl"]}
      <br />
    Blocks Averaged: {state.playerStats["blk"]}
      <br />
    FG% Averaged: {state.playerStats["fg_pct"]}
      <br />
    3P% Averaged: {state.playerStats["fg3_pct"]}
      <br />
    FT% Averaged: {state.playerStats["ft_pct"]}
    </div>
  );
}