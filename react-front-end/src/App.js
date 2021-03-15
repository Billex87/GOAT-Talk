import React, { useState } from 'react';
import axios from "axios";
import Player from "./components/Player.js";
import PlayerTwo from "./components/PlayerTwo.js";
import './App.css';

export default function Application(props) {

  const [state, setState] = useState({
    playerOneName: null,
    playerOneStats: { "pts": 0, "reb": 0, "ast": 0, "stl": 0, "blk": 0, "fg_pct": 0, "fg3_pct": 0, "ft_pct": 0 },
    seasonOne: null,
    firstNameOne: null,
    lastNameOne: null,
    positionOne: null,
    teamOne: null,
    yearOne: null,
    playerTwoName: null,
    playerTwoStats: { "pts": 0, "reb": 0, "ast": 0, "stl": 0, "blk": 0, "fg_pct": 0, "fg3_pct": 0, "ft_pct": 0 },
    seasonTwo: null,
    firstNameTwo: null,
    lastNameTwo: null,
    positionTwo: null,
    teamTwo: null,
    yearTwo: null
  });

  const getPlayerOne = (name, season) => {
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
              setState((prev) => ({
                ...prev,
                playerOneStats: res.data.data[0],
                yearOne: res.data.data[0].season
              }));
            }).catch(err => {
              console.log(err);
            });
          setState((prev) => ({
            ...prev,
            firstNameOne: res.data.data[0].first_name,
            lastNameOne: res.data.data[0].last_name,
            positionOne: res.data.data[0].position,
            teamOne: res.data.data[0].team.abbreviation,

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
              setState((prev) => ({
                ...prev,
                playerTwoStats: res.data.data[0],
                yearTwo: res.data.data[0].season
              }));
            }).catch(err => {
              console.log(err);
            });
          setState((prev) => ({
            ...prev,
            firstNameTwo: res.data.data[0].first_name,
            lastNameTwo: res.data.data[0].last_name,
            positionTwo: res.data.data[0].position,
            teamTwo: res.data.data[0].team.abbreviation,

          }));

        }
      }).catch(err => {
        console.log(err);
      });

  };




  return (
    <div className="App">
      <div className="Vs">
        <Player getPlayerOne = {getPlayerOne} {...state}/>
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
        <PlayerTwo getPlayerTwo = {getPlayerTwo} {...state} />
      </div>
    </div>
  );
}


