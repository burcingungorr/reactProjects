import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPiece, movePiece, resetGame } from "../redux/gameSlice";
import Square from "./Square";

const Board = () => {
  const dispatch = useDispatch();
  const { board, selectedPiece, validMoves, scores, winner } = useSelector((state) => state.game);

  const handleClick = (row, col) => {
    if (selectedPiece) {
      if (validMoves.some((move) => move.capture) && !validMoves.some((move) => move.row === row && move.col === col)) {
        return;
      }
  
      dispatch(
        movePiece({
          fromRow: selectedPiece.row,
          fromCol: selectedPiece.col,
          toRow: row,
          toCol: col,
        })
      );
    } else {
      dispatch(selectPiece({ row, col }));
    }
  };

  return (
    <div className="game-container">
      <div className="board">
        {board.map((rowArr, rowIndex) =>
          rowArr.map((piece, colIndex) => {
            const noMove = selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex && validMoves.length === 0;

            return (
              <Square
                key={`${rowIndex}-${colIndex}`}
                piece={piece}
                row={rowIndex}
                col={colIndex}
                isSelected={selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex}
                isValidMove={validMoves.some((move) => move.row === rowIndex && move.col === colIndex)}
                noMove={noMove} 
                onClick={handleClick}
              />
            );
          })
        )}
      </div>

      <div className="scoreboard">
        <h2>Skor</h2>
        <p>Siyah:</p>
        <p>{scores.black}</p>
        <p>Beyaz:</p>
        <p> {scores.white}</p>
        {winner && (
          <div className="winner">
            <h3>{winner}</h3>
            <button className="reset-btn" onClick={() => dispatch(resetGame())}>Yeni Oyun</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
