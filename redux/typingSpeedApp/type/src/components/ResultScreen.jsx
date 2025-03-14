import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { restartGame } from "../redux/gameSlice";

const ResultScreen = () => {
  const { correctWords, wrongWords } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  return (
    <div className="result-screen">
      <h2>Sonuçlar</h2>
      <p>Doğru Kelime: {correctWords}</p>
      <p>Yanlış Kelime: {wrongWords}</p>
      <button onClick={() => dispatch(restartGame())}>Tekrar Oyna</button>
    </div>
  );
};

export default ResultScreen;
