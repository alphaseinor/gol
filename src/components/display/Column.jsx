import React from 'react'

const Column = ({i, j, col}) => {
    return (
        <button 
            key={j} 
            value={`{x:${j}, y:${i}}`} 
            className={col.toString()}
        >
            value={"X: " + j + " Y: " + i} 
        </button>
    )
}

export default Column

