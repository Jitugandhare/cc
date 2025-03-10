import React, { useCallback, useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);

    const handleCount = useCallback(() => {
        setCount(prev=>prev+1)
    }, [])

    return (
        <div>
            <p>Count:{count}</p>
            <button onClick={handleCount}>Add</button>
        </div>
    )
}

export default Counter