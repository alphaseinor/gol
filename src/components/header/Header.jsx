import React, { useContext } from 'react'

import {GameContext} from "../../GameContext"

const Header = () => {
    const {game, setGame, step} = useContext(GameContext)

    return (<>
        <h1>Conway's Game of Life</h1>
        <div>
            <button
                onClick={(e)=>{
                    e.preventDefault()
                    setGame({...game, play: !game.play})
                }}
            >
                {game.play ? "Pause" : "Play"}
            </button>
            <button
                disabled = {game.play}
                onClick={(e)=>{
                    localStorage.clear("gameState")
                    window.location.reload()
                }}
            >
                Reset
            </button>
            <button
                disabled = {game.play}
                onClick = {(e)=>{
                    e.preventDefault()
                    step()
                }}
            >
                Step
            </button>
        </div>
        <div className="speed">
            <button
                disabled = {game.speed <= 1 ? true : game.play ? true : false}
                onClick={(e)=>{
                    e.preventDefault()
                    setGame({...game, speed: game.speed - 1})
                }}
            >-</button>
            <h3>Delay: {game.speed}</h3>
            <button
                disabled = {game.speed > 9 ? true : game.play ? true : false}
                onClick={(e)=>{
                    e.preventDefault()
                    setGame({...game, speed: game.speed + 1})
                }}
            >+</button>
        </div>
    </>)
}

export default Header