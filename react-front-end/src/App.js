import React, {useState} from 'react';
import axios from "axios";

export default function Application(props) {

  const [state, setState] = useState({
    playerName: null,
    playerStats: {}
  });

const handleSubmit = (e) => {
  console.log("me dumb!")
  e.preventDefault();
  getPlayerId()
  console.log(state.playerName)
}

const handleChange = (event) => {
  const replace = event.target.value.split(" ").join("_");
  if(replace.length > 0){
    setState((prev) => ({
      ...prev,
      playerName: replace
    }));
  } else {
    alert("Please type players name!")
  }
}

  const getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${state.playerName}`)
    .then(async res => {
      // console.log(res.data.data)
      if(typeof res.data.data[0] === "undefined"){
        alert("This player is either injured or hasn't played yet!")
      } else if(res.data.data.length > 1){
        alert("Pleases specify the name more!")
      } else{
        await getPlayerStats(res.data.data[0].id)

      }
    }).catch(err => {
      console.log(err)
    })
  }

  const getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2006&player_ids[]=${playerId}`)
    .then(async res => {
      console.log(res.data.data)
      setState((prev) => ({
        ...prev,
        playerStats: res.data.data[0]
      }));
    }).catch(err => {
      console.log(err)
    })
  }

  // useEffect(() => {

  //   }, []);


  
  return (
    <div className="App">
     <form onSubmit={handleSubmit}>
       <label>
         Name
         <input 
          type="text"
          value={state.value}
          onChange={handleChange}
          placeholder="please enter players name"
         />
       </label>
       <input type="submit" value="Submit"/>
     </form>
     games played: {state.playerStats["games_played"]}
     <br />
     points averaged: {state.playerStats["pts"]}
     <br />
     rebounds averaged: {state.playerStats["reb"]}
     <br />
     assists averaged: {state.playerStats["ast"]}
    </div>
  );
}

