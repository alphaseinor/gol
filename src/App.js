import React, { useState, useEffect  } from 'react';
import './App.scss';
import Display from './components/display/Display';

import {GameContext} from './GameContext'

function App() {

  const [game, setGame] = useState({
    speed: 0,
    play: true,
    xdim:25,
    ydim:30,
    display: ["unset"]
  })

  const resetDisplay = () => {
    setGame({...game, display: Array.from({length: game.ydim},()=> Array.from({length: game.xdim}, () => false))})
  }

  // initialize the display array
  useEffect(()=>{
    if(game.display[0] === "unset"){
      const gameState = localStorage.getItem("gameState")
      if(gameState == null){
        resetDisplay()
      } else {
        setGame(JSON.parse(gameState))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  //console.log whenever there's a change in game state
  useEffect(()=>{
    console.log(game)
    localStorage.setItem("gameState", JSON.stringify(game))
  }, [game])

  return (
    <GameContext.Provider value={{game, setGame}} >
    <div className="App">
      <header>
        <h1>Conway's Game of Life</h1>
      </header>
      <main>
        <Display />
      </main>
    </div>
    </GameContext.Provider>
  );
}

export default App;
