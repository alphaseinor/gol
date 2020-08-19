import React from 'react'

const Column = ({i, j, col}) => {
    return (
        <button 
            key={j} 
            value={i + " " + j} 
            className={col.toString()}
        ></button>
    )
}

export default Column

