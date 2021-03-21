import React from 'react'

export default function PokemanList({pokeman}) {
    
    return (
        <div>
            {pokeman.map(p => (
                <div key={p}>{p}</div>
            ))}
        </div>
    )
}
