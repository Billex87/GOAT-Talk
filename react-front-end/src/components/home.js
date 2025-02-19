import React, { useState } from "react";
import axios from "axios";
import Compare from "./Compare.js";
import './home.css';

export default function Home(props) {

  const [playerOneState, setPlayerOneState] = useState({
    playerName: null,
    playerStats: { "pts": 0, "reb": 0, "ast": 0, "per": 0, "ts%": 0 },
    season: null,
    firstName: null,
    lastName: null,
    position: null,
    team: null,
    year: null,
    per: null,
  });

  const [playerTwoState, setPlayerTwoState] = useState({
    playerName: null,
    playerStats: { "pts": 0, "reb": 0, "ast": 0, "per": 0, "ts%": 0 },
    season: null,
    firstName: null,
    lastName: null,
    position: null,
    team: null,
    year: null,
    per: null,
  });

  const showWinner = () => {
    let winner;
    if (playerOneState.firstName !== null && playerTwoState.firstName !== null) {
      if (playerOneState.per > playerTwoState.per) {
        winner = playerOneState.per;
      }
      if (playerOneState.per < playerTwoState.per) {
        winner = playerTwoState.per;
      }
    }
    return winner;
  };


  const getPlayerOne = (name, season) => {
    if (name === "the_king") {

      let stats = { ast: 5.33, per: 35.6, player_id: 100, pts: 39.8, reb: 5.67, season: 2020, "ts%": 45.6, };

      setPlayerOneState((prev) => ({
        ...prev,
        playerStats: stats,
        year: season,
        per: stats.per,
        firstName: "Andy",
        lastName: "Lindsay",
        position: "",
        team: "Lighthouse Labs"
      }));

    } else {

      axios.get(`https://www.balldontlie.io/api/v1/players?search=${name}`)
        .then(async res => {
          if (typeof res.data.data[0] === "undefined") {
            alert("This player is either injured or hasn't played yet! They must not be a GOAT!");
          } else if (res.data.data.length > 1) {
            alert("Please specify the name more to find out the true GOAT!");
          } else {
            axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${res.data.data[0].id}`)
              .then(async res => {
                if (typeof res.data.data[0] === "undefined") {
                  alert("This player exists but did not play this season, please pick a valid season to find out the one true GOAT");
                  setPlayerOneState((prev) => ({
                    ...prev,
                    playerName: null,
                    playerStats: { "pts": 0, "reb": 0, "ast": 0, "per": 0, "ts%": 0 },
                    season: null,
                    firstName: null,
                    lastName: null,
                    position: null,
                    team: null,
                    year: null,
                    per: null,
                  }));
                }
                // let FTA = Math.round((res.data.data[0].fta * res.data.data[0].games_played)* 100) / 100;
                // let ThreePTA = Math.round((res.data.data[0].fg3a * res.data.data[0].games_played)* 100) / 100;
                // let FGA = Math.round((res.data.data[0].fga * res.data.data[0].games_played)* 100) / 100;
                // let TFGA = Math.round((FGA + ThreePTA)* 100) / 100;
                // let TSA = (TFGA + 0.44 * FTA);

                // res.data.data[0]["ts%"] = Math.round(((res.data.data[0].pts * res.data.data[0].games_played) / (TSA * 2))*100* 100) / 100;
                // calculates TS%
                res.data.data[0]["ts%"] = Math.round(((res.data.data[0].pts * res.data.data[0].games_played) / (((Math.round(((Math.round((res.data.data[0].fga * res.data.data[0].games_played) * 100) / 100) + (Math.round((res.data.data[0].fg3a * res.data.data[0].games_played) * 100) / 100)) * 100) / 100) + 0.44 * (Math.round((res.data.data[0].fta * res.data.data[0].games_played) * 100) / 100)) * 2)) * 100 * 100) / 100;

                let mins = Math.round((((Number(res.data.data[0].min.split(":")[0]) * 60) + Number(res.data.data[0].min.split(":")[1])) / 60) * 100) / 100;
                console.log(res.data.data[0]);

                // calculates PER
                res.data.data[0].per = Math.round(((
                  (((res.data.data[0].fga * res.data.data[0].games_played) * res.data.data[0].fg_pct) * 85.910) +
                  ((res.data.data[0].stl * res.data.data[0].games_played) * 53.897) +
                  (((res.data.data[0].fg3a * res.data.data[0].games_played) * res.data.data[0].fg3_pct) * 51.757) +
                  (((res.data.data[0].fta * res.data.data[0].games_played) * res.data.data[0].ft_pct) * 46.845) +
                  ((res.data.data[0].blk * res.data.data[0].games_played) * 39.190) +
                  ((res.data.data[0].oreb * res.data.data[0].games_played) * 39.190) +
                  ((res.data.data[0].ast * res.data.data[0].games_played) * 34.677) +
                  ((res.data.data[0].dreb * res.data.data[0].games_played) * 14.707) -
                  ((res.data.data[0].pf * res.data.data[0].games_played) * 17.174) -
                  (((res.data.data[0].fta * res.data.data[0].games_played) - (((res.data.data[0].fta * res.data.data[0].games_played) * res.data.data[0].ft_pct))) * 20.091) -
                  (((res.data.data[0].fga * res.data.data[0].games_played) - (((res.data.data[0].fga * res.data.data[0].games_played) * res.data.data[0].fg_pct))) * 39.190) -
                  ((res.data.data[0].turnover * res.data.data[0].games_played) * 53.897)) *
                  (1 / (mins * res.data.data[0].games_played))
                ) * 100) / 100;

                let ptsRounded = Math.round((res.data.data[0].pts + 0.01)*100)/100;
                let astRounded = Math.round((res.data.data[0].ast - 0.01)*100)/100;
                let rebRounded = Math.round((res.data.data[0].reb + 0.01)*100)/100;
                res.data.data[0].pts = ptsRounded;
                res.data.data[0].ast = astRounded;
                res.data.data[0].reb = rebRounded;

                console.log(res.data.data[0]);

                setPlayerOneState((prev) => ({
                  ...prev,
                  playerStats: res.data.data[0],
                  year: res.data.data[0].season,
                  per: res.data.data[0].per
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
    }
  };
  const getPlayerTwo = (name, season) => {
    if (name === "the_king") {

      let stats = { ast: 5.43, per: 35.6, player_id: 100, pts: 39.8, reb: 5.67, season: 2020, "ts%": 45.6, };

      setPlayerTwoState((prev) => ({
        ...prev,
        playerStats: stats,
        year: season,
        per: stats.per,
        firstName: "Andy",
        lastName: "Lindsay",
        position: "",
        team: "Lighthouse Labs"
      }));

    } else {
      axios.get(`https://www.balldontlie.io/api/v1/players?search=${name}`)
        .then(async res => {
          // console.log(res.data.data)
          if (typeof res.data.data[0] === "undefined") {
            alert("This player is either injured or hasn't played yet! They must not be a GOAT!");
          } else if (res.data.data.length > 1) {
            alert("Please specify the name more to find out the true GOAT!");
          } else {
            axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${res.data.data[0].id}`)
              .then(async res => {
                if (typeof res.data.data[0] === "undefined") {
                  alert("This player exists but did not play this season, please pick a valid season to find out the one true GOAT");
                  setPlayerTwoState((prev) => ({
                    ...prev,
                    playerName: null,
                    playerStats: { "pts": 0, "reb": 0, "ast": 0, "stl": 0, "blk": 0, "fg_pct": 0, "fg3_pct": 0, "ft_pct": 0, "per": 0, "ts%": 0 },
                    season: null,
                    firstName: null,
                    lastName: null,
                    position: null,
                    team: null,
                    year: null,
                    per: null,
                  }));
                }
                // calculates TS%
                res.data.data[0]["ts%"] = Math.round(((res.data.data[0].pts * res.data.data[0].games_played) / (((Math.round(((Math.round((res.data.data[0].fga * res.data.data[0].games_played) * 100) / 100) + (Math.round((res.data.data[0].fg3a * res.data.data[0].games_played) * 100) / 100)) * 100) / 100) + 0.44 * (Math.round((res.data.data[0].fta * res.data.data[0].games_played) * 100) / 100)) * 2)) * 100 * 100) / 100;

                let mins = Math.round((((Number(res.data.data[0].min.split(":")[0]) * 60) + Number(res.data.data[0].min.split(":")[1])) / 60) * 100) / 100;

                // calculates PER
                res.data.data[0].per = Math.round(((
                  (((res.data.data[0].fga * res.data.data[0].games_played) * res.data.data[0].fg_pct) * 85.910) +
                  ((res.data.data[0].stl * res.data.data[0].games_played) * 53.897) +
                  (((res.data.data[0].fg3a * res.data.data[0].games_played) * res.data.data[0].fg3_pct) * 51.757) +
                  (((res.data.data[0].fta * res.data.data[0].games_played) * res.data.data[0].ft_pct) * 46.845) +
                  ((res.data.data[0].blk * res.data.data[0].games_played) * 39.190) +
                  ((res.data.data[0].oreb * res.data.data[0].games_played) * 39.190) +
                  ((res.data.data[0].ast * res.data.data[0].games_played) * 34.677) +
                  ((res.data.data[0].dreb * res.data.data[0].games_played) * 14.707) -
                  ((res.data.data[0].pf * res.data.data[0].games_played) * 17.174) -
                  (((res.data.data[0].fta * res.data.data[0].games_played) - (((res.data.data[0].fta * res.data.data[0].games_played) * res.data.data[0].ft_pct))) * 20.091) -
                  (((res.data.data[0].fga * res.data.data[0].games_played) - (((res.data.data[0].fga * res.data.data[0].games_played) * res.data.data[0].fg_pct))) * 39.190) -
                  ((res.data.data[0].turnover * res.data.data[0].games_played) * 53.897)) *
                  (1 / (mins * res.data.data[0].games_played))
                ) * 100) / 100;
                
                let ptsRounded = Math.round((res.data.data[0].pts + 0.01)*100)/100;
                let astRounded = Math.round((res.data.data[0].ast + 0.01)*100)/100;
                let rebRounded = Math.round((res.data.data[0].reb + 0.01)*100)/100;
                res.data.data[0].pts = ptsRounded;
                res.data.data[0].ast = astRounded;
                res.data.data[0].reb = rebRounded;
                setPlayerTwoState((prev) => ({
                  ...prev,
                  playerStats: res.data.data[0],
                  year: res.data.data[0].season,
                  per: res.data.data[0].per
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
  };

  const playerOneChart = [];
  const playerTwoChart = [];

  const keys = ["pts", "reb", "ast", "per", "ts%"]; //2nd one for other
  for (const key of keys) {
    const result = playerOneState.playerStats[key] > playerTwoState.playerStats[key];
    playerOneChart.push(result);
    playerTwoChart.push(!result);
  }
  // const playerOneChartTwo = [];
  // const playerTwoChartTwo = [];

  // const keysTwo = ["fg_pct", "fg3_pct", "ft_pct", "per", "ts%"]; //2nd one for other
  // for (const key of keysTwo) {
  //   const result = playerOneState.playerStats[key] > playerTwoState.playerStats[key];
  //   playerOneChartTwo.push(result);
  //   playerTwoChartTwo.push(!result);
  // }

  // console.log('playerOneChartTwo', playerOneChartTwo);
  // console.log('playerTwoChartTwo', playerTwoChartTwo);


  return (
    <div className="App">
      <div className="Vs">
        <img className="vsLogo" src="images/versus3.png" alt="" />
        {/* <h1 className="vsLogo">VS</h1> */}
        <Compare winner={showWinner() === playerOneState.per} boolsOne={playerOneChart} reversed={true} playerAwards={"steph"} playerAwardsImage={"curry_awards"} playerImage={"playerImage1"} nameStyle={"name"} yearStyle={"year"} teamStyle={"team"} getPlayer={getPlayerOne} {...playerOneState} />
        <section className="Tetris">
          <p>PPG</p>
          <p>RPG</p>
          <p>APG</p>
          <p>P.E.R.</p>
          <p>TS%</p>


        </section>
        <Compare reversed={false} winner={showWinner() === playerTwoState.per} boolsOne={playerTwoChart} playerAwards={"lebron"} playerAwardsImage={"lebron_awards"} playerImage={"playerImage2"} nameStyle={"name2"} yearStyle={"year2"} teamStyle={"team2"} getPlayer={getPlayerTwo} {...playerTwoState} />
      </div>
      {/* <img className={'steph'} src={`images/${playerOneState.firstName}_${playerOneState.lastName}_awards.png`} alt="" />
      <img className={'lebron'} src={`images/${playerTwoState.firstName}_${playerTwoState.lastName}_awards.png`} alt="" /> */}
    </div>
  );

}