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
    playerStats: {"pts":0,"reb":0,"ast":0,"stl":0,"blk":0,"fg_pct":0,"fg3_pct":0,"ft_pct":0},
    season: null,
    firstName: null,
    lastName: null,
    position: null,
    team: null,
  });
  const stats = {
    series: [{
    data: [state.playerStats["pts"], state.playerStats["reb"], state.playerStats["ast"], state.playerStats["stl"], state.playerStats["blk"]]
  }],
  options: {
    yaxis: {
  max: 28,

  forceNiceScale: true,
  floating: false,
  decimalsInFloat: undefined,
  labels: {
      show: true,
      align: 'right',
      minWidth: 0,
      maxWidth: 160,
      style: {
          colors: [],
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-yaxis-label',
      },
  },
  axisBorder: {
      show: true,
      color: '#78909C',
      offsetX: 0,
      offsetY: 0
  }
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
      categories: ['', '', '', '', '', ''],    
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      formatter: function (val, opts) {
          return val
      },
      textAnchor: 'middle',
      distributed: false,
      offsetX: 0,
      offsetY: 0,
      style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: undefined
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
      }
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
    
  },
};
const efficiency = {
  series: [{
  data: [state.playerStats["fg_pct"], state.playerStats["fg3_pct"], state.playerStats["ft_pct"]]
}],
options: {
  yaxis: {
min: 0,
max: 1,

forceNiceScale: true,
floating: false,
tickAmount: 5,
decimalsInFloat: undefined,
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
    categories: ['', '', ''],    
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: undefined,
    formatter: function (val, opts) {
        return val
    },
    textAnchor: 'middle',
    distributed: false,
    offsetX: 0,
    offsetY: 0,
    style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: undefined
    },
    background: {
      enabled: true,
      foreColor: '#fff',
      padding: 4,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: '#fff',
      opacity: 0.9,
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      }
    },
    dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
    }
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['#fff']
  }, 
},
};

 // Line 37 ----- PPG', 'RPG', 'APG', 'SPG', 'BPG', 'FG%','3PT%', 'FT%' - Graph Order
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
            team: res.data.data[0].team.abbreviation,
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
      <img className="playerImage2" src="images/lebron.png" alt="Lebron" />
      <form onSubmit={handleSubmit}>
        <SportsBasketballIcon className="ball2"/>
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
      {state.firstName} {state.lastName} {state.position} {state.team}
      <br />
    {<Chart options={stats.options} series={stats.series} type="bar" height={350} />}
    {<Chart options={efficiency.options} series={efficiency.series} type="bar" height={210} />}
</div>
);
}
