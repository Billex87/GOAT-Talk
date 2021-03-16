import React, { useState } from 'react';
import axios from "axios";
import Player from "./components/Player.js";
import PlayerTwo from "./components/PlayerTwo.js";
import './App.css';

export default function Application(props) {

  const [playerOneState, setPlayerOneState] = useState({
    playerName: null,
    playerStats: { "pts": 0, "reb": 0, "ast": 0, "stl": 0, "blk": 0, "fg_pct": 0, "fg3_pct": 0, "ft_pct": 0 },
    season: null,
    firstName: null,
    lastName: null,
    position: null,
    team: null,
    year: null,
  })

  const [playerTwoState, setPlayerTwoState] = useState({
    playerName: null,
    playerStats: { "pts": 0, "reb": 0, "ast": 0, "stl": 0, "blk": 0, "fg_pct": 0, "fg3_pct": 0, "ft_pct": 0 },
    season: null,
    firstName: null,
    lastName: null,
    position: null,
    team: null,
    year: null,
  })

  const getPlayerOne = (name, season) => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${name}`)
      .then(async res => {
        // console.log(res.data.data)
        if (typeof res.data.data[0] === "undefined") {
          alert("This player is either injured or hasn't played yet!");
        } else if (res.data.data.length > 1) {
          alert("Please specify the name more!");
        } else {
          axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${res.data.data[0].id}`)
            .then(async res => {
              console.log(res.data.data);
              setPlayerOneState((prev) => ({
                ...prev,
                playerStats: res.data.data[0],
                year: res.data.data[0].season
              }));
            }).catch(err => {
              console.log(err);
            });
          setPlayerOneState((prev) => ({
            ...prev,
            firstName: res.data.data[0].first_name,
            lastName: res.data.data[0].last_name,
            position: res.data.data[0].position,
            team: res.data.data[0].team.city,

          }));

        }
      }).catch(err => {
        console.log(err);
      });

  };
  const getPlayerTwo = (name, season) => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${name}`)
      .then(async res => {
        // console.log(res.data.data)
        if (typeof res.data.data[0] === "undefined") {
          alert("This player is either injured or hasn't played yet!");
        } else if (res.data.data.length > 1) {
          alert("Pleases specify the name more!");
        } else {
          axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${res.data.data[0].id}`)
            .then(async res => {
              console.log(res.data.data);
              setPlayerTwoState((prev) => ({
                ...prev,
                playerStats: res.data.data[0],
                year: res.data.data[0].season
              }));
            }).catch(err => {
              console.log(err);
            });
          setPlayerTwoState((prev) => ({
            ...prev,
            firstName: res.data.data[0].first_name,
            lastName: res.data.data[0].last_name,
            position: res.data.data[0].position,
            team: res.data.data[0].team.city,

          }));

        }
      }).catch(err => {
        console.log(err);
      });

  };




  return (
    <div className="App">
      <div className="Vs">
        <Player reversed={true} getPlayer={getPlayerOne} {...playerOneState}/>
        <section className="Tetris">
          <p>PPG</p>
          <p>RPG</p>
          <p>APG</p>
          <p>SPG</p>
          <p>BPG</p>
          <p>   </p>
          <p>   </p>
          <p>FG%</p>
          <p>3PT%</p>
          <p>FT%</p>
        </section>
        <Player reversed={false} getPlayer={getPlayerTwo} {...playerTwoState} />
      </div>
    </div>
  );
}


