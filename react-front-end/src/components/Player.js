import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShotChart from './ShotChart'
import Heatmap from './Heatmap'
import PlayerStats from './player-stats'
import PlayerNews from './player-news'
import PlayerGameLog from './player-game-log'
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import './player.scss'
import PlayerOverview from './player-overview'

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
  const [selected, setSelected] = useState(0)
  

  useEffect(() => {
    const url0 = axios.get(`https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/${playerID.id}/overview?region=us&lang=en&contentorigin=espn`);
    const url1 = axios.get(`https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/${playerID.id}/?region=us&lang=en&contentorigin=espn`);
    const url2 = axios.get(`https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/${playerID.id}/stats?region=us&lang=en&contentorigin=espn`);
    const url3 = axios.get(`https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/${playerID.id}/gamelog?region=us&lang=en&contentorigin=espn`);
    const url4 = axios.get(`https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/${playerID.id}/stats?region=us&lang=en&contentorigin=espn&seasontype=3`);
    let url5 = axios.get('/api/dummy');
    let url6 = axios.get('/api/dummy');


    if (playerID.id == '1966') {
      console.log("HERE!")
      url5 = axios.get('/api/shots?name=lebron');
      url6 = axios.get('/api/videos?name=lebron');//1966
    }
    if (playerID.id == 3975) {
      url5 = axios.get('/api/shots?name=curry');
      url6 = axios.get('/api/videos?name=curry');//3975
      console.log('HERE')
    }
    
    

    Promise.all([
      Promise.resolve(url0),
      Promise.resolve(url1),
      Promise.resolve(url2),
      Promise.resolve(url3),
      Promise.resolve(url4),
      Promise.resolve(url5),
      Promise.resolve(url6)
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          player_overview_stats: all[0].data,
          player_overview_all: all[1].data,
          player_stats: all[2].data,
          player_game_log: all[3].data,
          player_playoff_stats: all[4].data,
          player_shots: all[5].data,
          player_videos: all[6].data
        }))
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (null)
  }

  return(
    <div>
      <div className="player-header">
        <img src={`${state.player_overview_all.athlete.headshot.href}`} alt={"Player Headshot"} style={{ width: '20em' }} />
        <table className="player-info">
          <tbody>
            <tr>
              <th colSpan="2" className="player-name">{state.player_overview_all.athlete.displayName}</th>
            </tr>
            <tr>
              <th>Team:</th>
              <td>{state.player_overview_all.athlete.team.displayName}</td>
            </tr>
            <tr>
              <th>Number:</th>
              <td>{state.player_overview_all.athlete.displayJersey}</td>
            </tr>
            <tr>
              <th>Position:</th>
              <td>{state.player_overview_all.athlete.position.displayName}</td>
            </tr>
            <tr>
              <th>Height/Weight:</th>
              <td>{state.player_overview_all.athlete.displayHeight}/ {state.player_overview_all.athlete.displayWeight}</td>
            </tr>
            <tr>
              <th>DOB (age):</th>
              <td>{state.player_overview_all.athlete.displayDOB} ({state.player_overview_all.athlete.age})</td>
            </tr>
            <tr>
              <th>Draft Info</th>
              <td>{state.player_overview_all.athlete.displayDraft}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <div className="link-row">
        <div 
          className='bar-button' 
          style={ (selected === 0) ? {borderBottom: 'solid', borderBottomColor: 'blue', fontSize: '16px', fontWeight: 'bold'} : { fontSize: '15px' } }>
          <Link 
            onClick={()=>setSelected(0)}
            style={{
              textDecoration: 'none',
              color: 'black'
            }}
            to={`${url}`}>Overview</Link>
        </div>
        <div 
          className='bar-button'
          style={ (selected === 1) ? {borderBottom: 'solid', borderBottomColor: 'blue', fontSize: '16px', fontWeight: 'bold'} : { fontSize: '15px' } }>
          <Link 
            onClick={()=>setSelected(1)}
            style={{
              textDecoration: 'none',
              color: 'black'
            }}
            to={`${url}/stats`}>Stats</Link>
        </div>
        <div 
          className='bar-button' 
          style={ (selected === 2) ? {borderBottom: 'solid', borderBottomColor: 'blue', fontSize: '16px', fontWeight: 'bold'} : { fontSize: '15px' } }>
          <Link 
            onClick={()=>setSelected(2)}
            style={{
              textDecoration: 'none',
              color: 'black'
            }}
           to={`${url}/gamelog`}>Game Log</Link>
        </div>
        <div 
          className='bar-button' 
          style={ (selected === 3) ? {borderBottom: 'solid', borderBottomColor: 'blue', fontSize: '16px', fontWeight: 'bold'} : { fontSize: '15px' } }>
          <Link 
            onClick={()=>setSelected(3)}
            style={{
              textDecoration: 'none',
              color: 'black'
            }} 
            to={`${url}/news`}>News</Link>
        </div>
        <div 
          className='bar-button' 
          style={ (selected === 4) ? {borderBottom: 'solid', borderBottomColor: 'blue', fontSize: '16px', fontWeight: 'bold'} : { fontSize: '15px' } }>
          <Link 
            onClick={()=>setSelected(4)}
            style={{
              textDecoration: 'none',
              color: 'black'
            }} 
            to={`${url}/shotchart`}>Shot Chart</Link>
        </div>
        <div 
          className='bar-button' 
          style={ (selected === 5) ? {borderBottom: 'solid', borderBottomColor: 'blue', fontSize: '16px', fontWeight: 'bold'} : { fontSize: '13px' } }>
          <Link
            onClick={()=>setSelected(5)}     
            style={{
              textDecoration: 'none',
              color: 'black'
            }}  
            to={`${url}/zonechart`}>Zone Chart</Link>
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
        <Route path={`${path}/gamelog`}>
          <PlayerGameLog
            gameLog={state.player_game_log}
          />
        </Route>
        <Route path={`${path}/news`}>
          <PlayerNews
            news={state.player_overview_stats.news}
          />
        </Route>
        <Route path={`${path}/shotchart`}>
          <ShotChart
           shots={state.player_shots} 
           videos={state.player_videos}/>
          
        </Route>
          <Route path={`${path}/zonechart`}>
          <Heatmap shots={state.player_shots} />
        </Route>

      </Switch>

    </div>
  )

}