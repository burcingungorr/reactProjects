import React from "react";
import GameBoard from "./components/GameBoard";
import ResultScreen from "./components/ResultScreen";
import { useSelector } from "react-redux";

const App = () => {
  const gameStatus = useSelector((state) => state.game.gameStatus);

  return (
    <div className="app-container">
      {gameStatus === "finished" ? <ResultScreen /> : <GameBoard />}
    </div>
  );
};

export default App;
