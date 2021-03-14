import React, { useState } from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import './Player.css';
import Chart from 'react-apexcharts'

export default function Player(props) {

  const [state, setState] = useState({
    playerName: null,
    playerStats: {},
    season: null,
    firstName: null,
    lastName: null,
    position: null,
  });
  const example = {
    series: [{
    data: [state.playerStats["pts"], state.playerStats["reb"], state.playerStats["ast"], state.playerStats["stl"], state.playerStats["blk"], state.playerStats["fg_pct"], state.playerStats["fg3_pct"], state.playerStats["ft_pct"]]
  }],
  options: {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['PPG', 'RPG', 'APG', 'SPG', 'BPG', 'FG%',
        '3PT%', 'FT%'
      ],
    }
  },
};

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
      alert("Please Type Players Name!");
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
      alert("Please Type Players Name!");
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
          setState((prev) => ({
            ...prev,
            firstName: res.data.data[0].first_name,
            lastName: res.data.data[0].last_name,
            position: res.data.data[0].position,
          }));

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
      Player: {state.firstName} {state.lastName}
      <br />
      Position: {state.position}
      <br />
    { state.playerStats["games_played"] && <Chart options={example.options} series={example.series} type="bar" height={350} />}
</div>
);
}
