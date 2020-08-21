import React from 'react'
import Row from './Row'

const Display = ({game}) => {
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