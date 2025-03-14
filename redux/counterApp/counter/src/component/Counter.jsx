import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { increment,descrement,incrementByAmount } from '../redux/counter/counterSlice'

const Counter = () => {
    const countValue = useSelector(state=>state.counter.value) //degeri getir
    const dispatch=useDispatch(); //fonk. aktar
    const [amount,setAmount]=useState(1);


  return (
    <div>
     <div>   {countValue} </div>
        <button onClick={()=>dispatch(increment())}>Arttır</button>
        <button onClick={() => dispatch(descrement())}>Azalt</button>

        <div>
          <input type='number' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
          <button onClick={() => dispatch(incrementByAmount(3))}>Girilen miktar kadar arttır</button>

        </div>

    </div>
  )
}

export default Counter