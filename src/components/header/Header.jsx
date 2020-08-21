import React, { useContext } from 'react'

import {GameContext} from "../../GameContext"

const Header = () => {

    const {game, setGame, simulationLoop} = useContext(GameContext)

    return (<>
        <h1>Conway's Game of Life</h1>
        <div>
            <button
                onClick={()=>{
                    setGame({...game, play: !game.play})
                }}
            >
                {game.play ? "Pause" : "Play"}
            </button>
        </div>
    </>)
}

export default Header