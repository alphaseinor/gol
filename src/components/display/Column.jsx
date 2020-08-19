import React from 'react'

const Column = ({i, j, col}) => {
    return (
        <button 
            key={j} 
            value={`{x:${i}, y:${j}}`} 
            className={col.toString()}
        >
            value={"X: " + i + " Y: " + j} 
        </button>
    )
}

export default Column

