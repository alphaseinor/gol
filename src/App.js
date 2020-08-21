import React, { useState, useEffect, useRef  } from 'react';
import './App.scss';
import produce from "immer"

import Display from './components/display/Display';

import {GameContext} from './GameContext'
import Header from './components/header/Header';

function App() {

  const neighbours = [
    [-1, -1],   [0, -1],   [1, -1],
    [-1, 0 ],              [1, 0 ],
    [-1, 1 ],   [0, 1 ],   [1, 1 ],
  ]

  const initialState = {
    speed: 10,
    play: false,
    xdim:25,
    ydim:30,
    display: ["unset"],
    refresh: true
  }

  const [game, setGame] = useState(initialState)
  const [generation, setGeneration] = useState(0)
  const [display, setDisplay] = useState([])

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
      console.log("loop")

      let display = produce(game.display, updateElement => {
        game.display.forEach((row, i) => {
          row.forEach((col, j) =>{
            let neighbourCount = 0;
            neighbours.forEach(([x, y])=>{
              const xi = x+i
              const jy = y+j
              //check boundry of element, edge cases
              if(xi > -1 && xi < game.display.length && jy > -1 && jy < row.length){
                //count the number of neighbors
                if(game.display[xi][jy] === true){
                  neighbourCount++;
                }
              }
              
              // if there's too little or too many neighbors, then the cell dies
              if(neighbourCount < 2 || neighbourCount > 3){
                updateElement[i][j] = false
              } else if(game.display[i][j] === false && neighbourCount === 3){
                updateElement[i][j] = true
              }
            })
          })
        });
      })
      console.log(display)
      setGame({...game, display: display })

      setTimeout(simulationLoop, game.speed * 100)
    }else{
      return
    }
  }
  
  useEffect(() => {
    console.log(generation)
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
