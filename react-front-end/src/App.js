import React, {useState} from 'react';
import axios from "axios";
import Player from "./components/Player.js"
import PlayerTwo from "./components/PlayerTwo.js"
import './App.css';

export default function Application(props) {

  return (
    <div className="App">
      <div className="Vs">
      <Player/>
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
      <PlayerTwo/>
      </div>
    </div>
  );
}


