import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame, updateInput, checkWord, decrementTime } from "../redux/gameSlice";

const GameBoard = () => {
  const dispatch = useDispatch();
  const { words, inputValue, timeLeft, gameStatus, currentWordIndex, typedWords } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && gameStatus === "playing") {
      timer = setInterval(() => dispatch(decrementTime()), 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameStatus, dispatch]);

  return (
    <div className="game-board">
      <h1>Typing Speed Test</h1>

      <div className="word-container">
        {words.map((word, index) => (
          <span
            key={index}
            className={
              index === currentWordIndex ? "current-word"  : typedWords[index]
                 ? typedWords[index].isCorrect ? "correct"   : "wrong"
                : ""
            }
          >
            {word}{" "}
          </span>
        ))}
      </div>
<div className="input-time">
<input
  type="text"
  value={inputValue}
  onChange={(e) => dispatch(updateInput(e.target.value))}
  onKeyDown={(e) => e.key === " " && dispatch(checkWord())}
  disabled={gameStatus !== "playing"} 
  autoFocus
/>

      <p>{timeLeft}sn</p> </div>
      <button onClick={() => dispatch(startGame())}>Başlat</button>
    </div>
  );
};

export default GameBoard;
