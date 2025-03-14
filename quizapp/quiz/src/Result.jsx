import React from 'react';
import { useLocation } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const { state } = location; //veriyi alabilmek için


  return (
    <div className="resultpage">
      <div>
        <h1 className="score"> Skorunuz: {state.score} / {state.total}</h1>
        <h2 className="scorecon"> Tebrikler!</h2>
      </div>
    </div>
  );
}

export default Result;
