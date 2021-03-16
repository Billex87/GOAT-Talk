import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/navbar'
import Search from './components/search'
import Leaders from './components/leaders'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ShotChart from './components/ShotChart'
import Heatmap from './components/Heatmap'
import Player from './components/player'
import Standings from './components/standings'
import Players from './components/players'
import Home from './components/home'


export default function App(props) {

  const [loading, setLoading] = useState(true)

  const [state, setState] = useState({
    lebron_shots: [],
    curry_shots: [],
    lebron_stats: [],
    curry_stats: [],
    leaders: [],
    players: [],
    news : []
  })

  useEffect(() => {
    const url0 = axios.get('/api/shots?name=lebron')
    const url1 = axios.get('/api/shots?name=curry')
    const url2 = axios.get('/api/dummy')
    const url3 = axios.get('/api/dummy')
    const url4 = axios.get('/api/leaders')
    const url5 = axios.get(`https://onefeed.fan.api.espn.com/apis/v3/cached/contentEngine/oneFeed/leagues/nba?source=ESPN.com`)
  
    Promise.all([
      Promise.resolve(url0),
      Promise.resolve(url1),
      Promise.resolve(url2),
      Promise.resolve(url3),
      Promise.resolve(url4),
      Promise.resolve(url5)
    ])
    .then((all) => {
      setState(prev => ({
        ...prev,
        lebron_shots: all[0].data,
        curry_shots: all[1].data,
        lebron_stats: all[2].data,
        curry_stats: all[3].data,
        leaders: all[4].data,
        news: all[5].data
      }))
      setLoading(false)
    })
  }, [])

  let curry_shots_object = state.curry_shots.shots;
  let curry_shots_array = [];

  for (let s in curry_shots_object) {
    curry_shots_array.push(curry_shots_object[s])
  }
  
  if (loading){
    return (null)
  }
  return (
    <div className="App">
      <div className="Vs">
      <Player reversed={true} playerAwards={"steph"} playerAwardsImage={"curry_awards"} playerImage={"playerImage1"} nameStyle={"name"} yearStyle={"year"} teamStyle={"team"} getPlayer={getPlayerOne} {...playerOneState}/>
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
        <Player reversed={false} playerAwards={"lebron"} playerAwardsImage={"lebron_awards"} playerImage={"playerImage2"} nameStyle={"name2"} yearStyle={"year2"} teamStyle={"team2"} getPlayer={getPlayerTwo} {...playerTwoState} />
      </div>
    </Router>
  );
}

