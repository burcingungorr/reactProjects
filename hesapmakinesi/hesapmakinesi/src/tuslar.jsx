import React from 'react'
import './tuslar.css'

export default function Tuslar({ setInput, input }) {
  const handleClick = (value) => {
    setInput(input + value);
  if(value == '='){
    setInput(eval(input).toString());
  } else if(value=='c') {
    setInput("")
  }
  };


  return (

    <div>
        <div>
            <button  onClick={() => handleClick("1")}>1</button>
            <button onClick={() => handleClick("2")}>2</button>
            <button onClick={() => handleClick("3")}>3</button>
            <button className='islem' onClick={() => handleClick("+")}>+</button>
        </div>
        <div>
            <button onClick={() => handleClick("4")}>4</button>
            <button onClick={() => handleClick("5")}>5</button>
            <button onClick={() => handleClick("6")}>6</button>
            <button className='islem' onClick={() => handleClick("-")}>-</button>

        </div>
        <div>
            <button onClick={() => handleClick("7")}>7</button>
            <button onClick={() => handleClick("8")}>8</button>
            <button onClick={() => handleClick("9")}>9</button>
            <button className='islem' onClick={() => handleClick("*")}>*</button>
        </div>
        <div>
            <button  onClick={() => handleClick("/")}>/</button>
            <button onClick={() => handleClick("0")}>0</button>
            <button className='islem' onClick={() => handleClick("c")}>c</button>
            <button  onClick={() => handleClick("=")}>=</button>
        </div>

    </div>
  )
}
