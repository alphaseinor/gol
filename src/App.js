import React, { useState, useEffect, useRef  } from 'react';
import './App.scss';
import Display from './components/display/Display';

import {GameContext} from './GameContext'
import Header from './components/header/Header';

function App() {

  const initialState = {
    speed: 10,
    play: false,
    xdim:25,
    ydim:30,
    display: ["unset"],
    refresh: true
  }

  const [game, setGame] = useState(initialState)

  const playRef = useRef(game.play)
  playRef.current = game.play

  const resetDisplay = () => {
    if(game.display[0] === "unset"){
      console.log(`resetDisplay unset`)
      let gameState = localStorage.getItem("gameState")
      gameState = JSON.parse(gameState)
      if(gameState == null || gameState.display[0] === "unset"){
        console.log(`resetDisplay null or unset in localStorage`)
        setGame({...game, display: Array.from({length: game.ydim},()=> Array.from({length: game.xdim}, () => false))})
      } else {
        console.log(`resetDisplay setGame with localStorage`)
        setGame(gameState)
      }
    }
  }

  // initialize the display array
  useEffect(()=>{
    resetDisplay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const simulationLoop = ()=> {
    if(playRef.current === true){
      
      setTimeout(simulationLoop, game.speed * 100)
    }
  }
  
  useEffect(() => {
    const timer = simulationLoop()
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.play])

  //console.log whenever there's a change in game state
  useEffect(()=>{
    console.log(game)
    //save the game state, but make sure it's paused
    localStorage.setItem("gameState", JSON.stringify({...game, play: false}))
  }, [game])

  return (
    <GameContext.Provider value={{game, setGame}} >
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Display />
      </main>
    </div>
    </GameContext.Provider>
  );
}

export default App;
