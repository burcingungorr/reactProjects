import React from 'react'
import useStore from './Store'

const Counter = () => {
  const count = useStore((state) => state.count)
  const increment = useStore((state) => state.increment)
  const decrement = useStore((state) => state.decrement)
  return (
<div>
      <p>Sayı: {count}</p>
      <button onClick={increment}>Arttır</button>
      <button onClick={decrement}>Azalt</button>
    </div>  )
}

export default Counter