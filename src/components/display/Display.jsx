import React, { useContext } from 'react'
import Row from './Row'

import {GameContext} from "../../GameContext"

const Display = () => {

    const {game} = useContext(GameContext)

    return(
        <>
        {
            game.display.map((row, i)=>(
                <Row key={i} i={i} row={row} game ={game} />
            ))
        }
        </>
    )
}

export default Display