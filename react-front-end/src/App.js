import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Leaders from './components/leaders';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Player from './components/player';
import Standings from './components/standings';
import Players from './components/players';
import Home from './components/home';

export default function App(props) {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    leaders: [],
    players: [],
    news: []
  });

  useEffect(() => {
    Promise.all([
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
        }));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (null);
  }
  
  return (
    <Router>
      <div className="rightColor">
        <div className="App">
          <Navbar />
        </div>
        <div>
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
      </div>
    </Router>
  );
}