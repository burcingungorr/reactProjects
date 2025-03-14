import React from "react";

const Square = ({ piece, row, col, isSelected, isValidMove, onClick }) => {
  return (
    <div
      className={`square ${(row + col) % 2 === 0 ? "light" : "dark"} 
        ${isSelected ? "selected" : ""} 
        ${isValidMove ? "valid-move" : ""}`}
      onClick={() => onClick(row, col)}
    >
      {piece && (
        <div className={`piece ${piece}`}>
          {piece.includes("king") && <span className="crown">👑</span>}
        </div>
      )}
    </div>
  );
};

export default Square;
