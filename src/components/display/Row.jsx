import React from 'react'
import Column from './Column'

const Row = ({row, i}) => {
    return(
        <section key={i}>
            {
                row !== "unset" && row.map((col, j)=>(
                    <Column key={j} col={col} row={row} i={i} j={j} />
                ))
            }
        </section>
    )
}

export default Row