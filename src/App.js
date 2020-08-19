import React, { useState, useEffect } from 'react';
import './App.scss';
import Display from './components/display/Display';

function App() {

  const [game, setGame] = useState({
    speed: 0,
    play: true,
    xdim:25,
    ydim:25,
    display: ["unset"]
  })

  // initialize the display array
  if(game.display[0] === "unset"){
    console.log("unset")
    setGame({...game, display: Array.from({length: game.xdim},()=> Array.from({length: game.ydim}, () => false))})
    
  }
  
  //console.log whenever there's a change in game state
  useEffect(()=>{
    console.log(game)
  }, [game])

  return (
    <div className="App">
      <header>
        <h1>Conway's Game of Life</h1>
      </header>
      <main>
        <Display game={game} />
      </main>
    </div>
  );
}

export default App;
