export const calculateValidMoves = (board, row, col) => {
  let moves = [];
  const piece = board[row][col];
  if (!piece) return moves;

  const isWhite = piece.includes("white");
  const isBlack = piece.includes("black");
  const isKing = piece.includes("king");
  const opponent = isWhite ? "black" : "white";

  let canCapture = false;

  // Normal taş hareketleri
  if (!isKing) {
      for (let i = -1; i <= 1; i += 2) {
          if (col + i >= 0 && col + i <= 7 && board[row][col + i] === null) {
              moves.push({ row, col: col + i });
          }
          if (row + i >= 0 && row + i <= 7 && board[row + i][col] === null) {
              moves.push({ row: row + i, col });
          }
      }
  }

  // Dama taşları hareketleri 
  if (isKing) {
      for (let i = -7; i <= 7; i++) {
          if (i === 0) continue;
          if (row + i >= 0 && row + i <= 7 && board[row + i][col] === null) {
              moves.push({ row: row + i, col });
          }
          if (col + i >= 0 && col + i <= 7 && board[row][col + i] === null) {
              moves.push({ row, col: col + i });
          }
      }
  }

  // Taş yeme için kontrol
  const checkCapture = (startRow, startCol, dRow, dCol) => {
      let r = startRow + dRow;
      let c = startCol + dCol;
      let captured = false;

      while (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
          if (board[r][c] && board[r][c].includes(opponent)) {
              let jumpR = r + dRow;
              let jumpC = c + dCol;
              if (jumpR >= 0 && jumpR <= 7 && jumpC >= 0 && jumpC <= 7 && board[jumpR][jumpC] === null) {
                  moves.push({ row: jumpR, col: jumpC, capture: { row: r, col: c } });
                  canCapture = true;
                  captured = true;
                  
                  if (isKing) {
                      let nextR = jumpR + dRow;
                      let nextC = jumpC + dCol;
                      while (nextR >= 0 && nextR <= 7 && nextC >= 0 && nextC <= 7 && board[nextR][nextC] === null) {
                          moves.push({ row: nextR, col: nextC, capture: { row: r, col: c } });
                          nextR += dRow;
                          nextC += dCol;
                      }
                  }
              }
              break;
          } else if (board[r][c] !== null) {
              break;
          }
          if (!isKing) break; 
          r += dRow;
          c += dCol;
      }
  };

  // sadece dama için çoklu ilerleme
  checkCapture(row, col, -1, 0); 
  checkCapture(row, col, 1, 0);  
  checkCapture(row, col, 0, -1); 
  checkCapture(row, col, 0, 1);  

  if (canCapture) {
      moves = moves.filter((move) => move.capture);
  }

  return moves;
};