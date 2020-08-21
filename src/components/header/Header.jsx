import React, { useContext } from 'react'

import {GameContext} from "../../GameContext"

const Header = () => {
    const {game, setGame, initialState, resetDisplay} = useContext(GameContext)

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
                onClick={async (e)=>{
                    localStorage.clear("gameState")
                    window.location.reload()
                }}
            >
                Reset
            </button>
        </div>
    </>)
}

export default Header