import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerStats from './player-stats';
import PlayerNews from './player-news';
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import './player.scss';
import PlayerOverview from './player-overview';


export default function Player(props) {

  const [loading, setLoading] = useState(true);
  let { path, url } = useRouteMatch();
  let playerID = useParams();
  const [state, setState] = useState({
    player_overview_stats: [],
    player_overview_all: [],
    player_stats: [],
    player_game_log: [],
    player_playoff_stats: [],
    player_news: [],
    player_shots: [],
    player_videos: []
  });
  const [selected, setSelected] = useState(0);


  useEffect(() => {
    const url0 = axios.get(`https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/${playerID.id}/overview?region=us&lang=en&contentorigin=espn`);
    const url1 = axios.get(`https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/${playerID.id}/?region=us&lang=en&contentorigin=espn`);
    const url2 = axios.get(`https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/${playerID.id}/stats?region=us&lang=en&contentorigin=espn`);
    const url3 = axios.get(`https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/${playerID.id}/gamelog?region=us&lang=en&contentorigin=espn`);
    const url4 = axios.get(`https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/${playerID.id}/stats?region=us&lang=en&contentorigin=espn&seasontype=3`);


    Promise.all([
      Promise.resolve(url0),
      Promise.resolve(url1),
      Promise.resolve(url2),
      Promise.resolve(url3),
      Promise.resolve(url4),

    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          player_overview_stats: all[0].data,
          player_overview_all: all[1].data,
          player_stats: all[2].data,
          player_game_log: all[3].data,
          player_playoff_stats: all[4].data
        }));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (null);
  }

  return (
    <div>
      <div className="player-header">
      <table className="player-info">
      <tbody>
      <tr>
      <th colSpan="2" className="player-name">{state.player_overview_all.athlete.displayName}</th>
      </tr>
      <tr>
      <th style={{ color: 'white', fontSize: '22px'}}>Team:</th>
      <td style={{ color: 'gold', fontSize: '22px'}}>{state.player_overview_all.athlete.team.displayName}</td>
      </tr>
      <tr>
      <th style={{ color: 'white', fontSize: '22px'}}>Number:</th>
      <td style={{ color: 'gold', fontSize: '22px'}}>{state.player_overview_all.athlete.displayJersey}</td>
      </tr>
      <tr>
      <th style={{ color: 'white', fontSize: '22px'}}>Position:</th>
      <td style={{ color: 'gold', fontSize: '22px'}}>{state.player_overview_all.athlete.position.displayName}</td>
      </tr>
      <tr>
      <th style={{ color: 'white', fontSize: '22px'}}>Height/Weight:</th>
      <td style={{ color: 'gold', fontSize: '22px'}}>{state.player_overview_all.athlete.displayHeight}/ {state.player_overview_all.athlete.displayWeight}</td>
      </tr>
      <tr>
      <th style={{ color: 'white', fontSize: '22px'}}>DOB (age):</th>
      <td style={{ color: 'gold', fontSize: '22px'}}>{state.player_overview_all.athlete.displayDOB} ({state.player_overview_all.athlete.age})</td>
      </tr>
      <tr>
      <th style={{ color: 'white', fontSize: '22px'}}>Draft Info</th>
      <td style={{ color: 'gold', fontSize: '22px'}}>{state.player_overview_all.athlete.displayDraft}</td>
      </tr>
      </tbody>
      </table>
      <img src={`${state.player_overview_all.athlete.headshot.href}`} alt={"Player Headshot"} style={{ width: '30em' }} />
      </div>
      <hr />
      <div className="link-row">
        <div
          className='bar-button'
          style={(selected === 0) ? { borderBottom: 'solid', borderBottomColor: 'rgb(43, 107, 177)', fontSize: '26px', fontWeight: 'bold' } : { fontSize: '20px' }}>
          <Link
            onClick={() => setSelected(0)}
            style={{
              textDecoration: 'none',
              color: 'white'
            }}
            to={`${url}`}>Career Stats</Link>
        </div>
        <div
          className='bar-button'
          style={(selected === 1) ? { borderBottom: 'solid', borderBottomColor: 'rgb(43, 107, 177)', fontSize: '26px', fontWeight: 'bold' } : { fontSize: '20px' }}>
          <Link
            onClick={() => setSelected(1)}
            style={{
              textDecoration: 'none',
              color: 'white'
            }}
            to={`${url}/stats`}>Stats By Season</Link>
        </div>
        <div
          className='bar-button'
          style={(selected === 3) ? { borderBottom: 'solid', borderBottomColor: 'rgb(43, 107, 177)', fontSize: '26px', fontWeight: 'bold' } : { fontSize: '20px' }}>
          <Link
            onClick={() => setSelected(3)}
            style={{
              textDecoration: 'none',
              color: 'white',
              size: '18px'
            }}
            to={`${url}/news`}>News</Link>
        </div>
      </div>
      <hr />



      <Switch>
        <Route exact path={path}>
          <PlayerOverview
            stats={state.player_overview_stats.statistics}
            nextGame={state.player_overview_stats.nextGame}
          />
        </Route>
        <Route path={`${path}/stats`}>
          <PlayerStats
            stats={state.player_stats}
            playoff_stats={state.player_playoff_stats}
          />
        </Route>
        <Route path={`${path}/news`}>
          <PlayerNews
            news={state.player_overview_stats.news}
          />
        </Route>
      </Switch>

    </div>
  );

}