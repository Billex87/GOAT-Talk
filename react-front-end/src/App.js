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
    <Router>
      <div>
        <div className="App">
          <Navbar />
        </div>
        <Switch>
          <Route exact path="/">
            <Home
              news={state.news}
            />
          </Route>
          <Route path="/leaders">
            <Leaders 
              leaders={state.leaders}
            />
          </Route>
          <Route path="/shotchart">
            <ShotChart shots={state["lebron_shots"]} />
            <Heatmap shots={state["lebron_shots"]}/>
          </Route>
          <Route path='/player/:id'>
            <Player />
          </Route>
          <Route path='/standings'>
            <Standings
              standings={state.standings}
            />
          </Route>
          <Route path='/players/:term'>
            <Players />
          </Route>
          <Route path='/players'>
            <Players />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

