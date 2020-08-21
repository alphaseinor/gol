import React, { useState, useEffect, useCallback, useRef  } from 'react';
import './App.scss';
import Display from './components/display/Display';

import {GameContext} from './GameContext'
import Header from './components/header/Header';

function App() {

  const [game, setGame] = useState({
    speed: 10,
    play: false,
    xdim:25,
    ydim:30,
    display: ["unset"]
  })

  const playRef = useRef(game.play)
  playRef.current = game.play

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




  const simulationLoop = ()=> {
    if(playRef.current === true){
      console.log("update" + game.play)
      setTimeout(simulationLoop, game.speed * 100)
    }
  }


  
  useEffect(() => {
    // if(!playRef){
    //   console.log("no playRef")
    //   return
    // }
    const timer = simulationLoop()
    return () => clearTimeout(timer);
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
