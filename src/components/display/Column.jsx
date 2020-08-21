import React, {useContext} from 'react'
import produce from "immer"

import {GameContext} from "../../GameContext"

const Column = ({i, j, col}) => {

    const {game, setGame} = useContext(GameContext)

    return (
        <button 
            key={`${i},${j}`} 
            className={col.toString()}
            onClick={(e)=>{
                e.preventDefault()
                const display = produce(game.display, updateButton => {
                    updateButton[i][j] = game.display[i][j] ? false : true;
                })
                setGame({...game, display})
            }}
        >
            value={"X: " + j + " Y: " + i}
            
        </button>
    )
}

export default Column

