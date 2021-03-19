import React, { useState } from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import './Compare.css';
import Chart from 'react-apexcharts';

export default function Compare(props) {

  const KNOWN_PLAYER_NAMES = ['stephen_curry', 'lebron_james', 'michael_jordan', 'kobe_bryant'];
  const UNKNOWN_PLAYER_IMG_SRC = 'images/black.png';

  const [state, setState] = useState({
    playerName: null,
    season: null,
    imgSrc: UNKNOWN_PLAYER_IMG_SRC
  });
  const stats = {
    series: [{
      data: [props.playerStats["pts"], props.playerStats["reb"], props.playerStats["ast"], props.playerStats["stl"], props.playerStats["blk"]]
    }],
    options: {
      yaxis: {
        max: 28,
        reversed: props.reversed,
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
          return val;
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
      data: [props.playerStats["fg_pct"], props.playerStats["fg3_pct"], props.playerStats["ft_pct"], props.playerStats["per"], props.playerStats["ts%"]]
    }],
    options: {
      yaxis: {
        min: 0,
        max: 1,
        reversed: props.reversed,
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
      xaxis: {
        categories: ['', '', ''],
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (val, opts) {
          console.log("val ", val);
          return val;
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
    if (state.playerName && state.playerName.trim().length) {
      console.log('state.PlayerName', state.playerName)
      const playerImageSource = KNOWN_PLAYER_NAMES.includes(state.playerName) ? `images/${state.playerName}.png` : UNKNOWN_PLAYER_IMG_SRC;
      setState(prev =>
      ({
        ...prev,
        imgSrc: playerImageSource
      }));
    };
    props.getPlayer(state.playerName, state.season);
    // getPlayerId();
    // console.log(state.playerName);
  };

  const handleChange = (event) => {
    const replace = event.target.value.split(" ").join("_").toLowerCase();
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
    const replace = event.target.value.split(" ").join("_").toLowerCase();
    if (replace.length > 0) {
      setState((prev) => ({
        ...prev,
        season: replace
      }));
    } else {
      alert("Please Type Players Name!");
    }
  };


  return (
    <div className="Player">
      {props.winner && <img className="crown" src='images/crown2.png'
        alt="" />}
      <img className={props.playerImage} src={state.imgSrc}
        alt="" />
      <form onSubmit={handleSubmit}>
        <SportsBasketballIcon className="ball" />
        <label>
          <TextField
            id="standard-basic"
            type="text"
            value={state.value}
            onChange={handleChange}
            required={true}
            placeholder="Enter Player Name" />
          <TextField
            id="standard-basic"
            type="text"
            value={state.value}
            onChange={handleChangeSeason}
            required={true}
            placeholder="Enter Season" />
        </label>
        <Button type="submit" value="Submit" variant="contained" color="primary">Submit</Button>
      </form>
      <div className={props.nameStyle}>{props.firstName} {props.lastName}</div>
      <div className={props.yearStyle}>{props.year}</div>
      <div className={props.teamStyle}>{props.team} {props.position}</div>
      <br />
      {<Chart options={stats.options} series={stats.series} type="bar" height={350} />}
      {<Chart options={efficiency.options} series={efficiency.series} type="bar" height={210} />}
      {/* <img className={props.playerAwards} src={`images/${state.playerName}_awards.png`} alt="" /> */}
    </div>
  );
}