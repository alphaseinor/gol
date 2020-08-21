import React, {useContext} from 'react'
import produce from "immer"

import {GameContext} from "../../GameContext"

const Column = ({i, j, col}) => {

    const {game, setGame} = useContext(GameContext)

    return (
        <button 
            key={j} 
            value={`{x:${j}, y:${i}}`} 
            className={col.toString()}
            onClick={()=>{
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

