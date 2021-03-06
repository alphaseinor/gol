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
    [-1, 1 ],   [0, 1 ],   [1, 1 ]
  ]

  const initialState = {
    speed: 1,
    play: false,
    xdim:25,
    ydim:25,
    display: ["unset"],
    refresh: true,
    generation: 0
  }

  const [game, setGame] = useState(initialState)

  const playRef = useRef(game.play)
  playRef.current = game.play

  const displayRef = useRef(game.display)
  displayRef.current = game.display

  const generationRef = useRef(game.generation)
  generationRef.current = game.generation

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

  const step = () => {
    let display = produce(displayRef.current, updateElement => {
      displayRef.current.forEach((row, i) => {
        row.forEach((col, j) =>{
          let neighbourCount = 0;
          neighbours.forEach(([x, y])=>{
            const xi = x+i
            const yj = y+j
            //check boundry of element, edge cases
            if(xi > -1 && xi < displayRef.current.length && yj > -1 && yj < row.length){
              //count the number of neighbors
              if(displayRef.current[xi][yj] === true){
                neighbourCount++;
              }
            }
            
            // if there's too little or too many neighbors, then the cell dies
          })
          if(neighbourCount < 2 || neighbourCount > 3){
            updateElement[i][j] = false
          } else if(displayRef.current[i][j] === false && neighbourCount === 3){
            updateElement[i][j] = true
          }
        })
      });
    })

    setGame({...game, display, generation: generationRef.current +1 })
  }

  const simulationLoop = () => {
    if(playRef.current === true){
      console.log("loop")

      step()

      setTimeout(simulationLoop, game.speed * 100)
    }else{
      return
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
    <GameContext.Provider value={{game, setGame, step}} >
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Display />
      </main>
      <footer>
        <p>Generation: {game.generation}</p>
      </footer>
    </div>
    </GameContext.Provider>
  );
}

export default App;
