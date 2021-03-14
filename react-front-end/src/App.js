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
      <img className="Versus" src="images/versus.png" alt="Versus" />
      <PlayerTwo/>
      </div>
    </div>
  );
}


