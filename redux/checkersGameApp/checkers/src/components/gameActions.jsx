export const calculateValidMoves = (board, row, col) => {
    let moves = [];
    const piece = board[row][col];
  
    if (!piece) return moves;
  
    const isWhite = piece.includes("white");
    const isBlack = piece.includes("black");
    const isKing = piece.includes("king");
    const opponent = isWhite ? "black" : "white";
  
    let canCapture = false;
  
    // Taş hareketleri
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
  
    // Dama hareketleri
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
  
    // Taş yeme
    const captureMoves = [
      { r: row, c: col - 1, jumpR: row, jumpC: col - 2 },
      { r: row, c: col + 1, jumpR: row, jumpC: col + 2 },
      { r: row - 1, c: col, jumpR: row - 2, jumpC: col },
      { r: row + 1, c: col, jumpR: row + 2, jumpC: col },
    ];
  
    captureMoves.forEach(({ r, c, jumpR, jumpC }) => {
      if (
        r >= 0 &&
        r <= 7 &&
        c >= 0 &&
        c <= 7 &&
        board[r][c] &&
        board[r][c].includes(opponent) &&
        jumpR >= 0 &&
        jumpR <= 7 &&
        jumpC >= 0 &&
        jumpC <= 7 &&
        board[jumpR][jumpC] === null
      ) {
        moves.push({ row: jumpR, col: jumpC, capture: { row: r, col: c } });
        canCapture = true;
      }
    });
  
    if (canCapture) {
      moves = moves.filter((move) => move.capture);
    }
  
    return moves;
  };
  