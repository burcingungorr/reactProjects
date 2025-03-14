import { createSlice, current } from "@reduxjs/toolkit";
import { calculateValidMoves } from "../components/gameActions";

const initialState = {
  board: Array(8)
    .fill(null)
    .map((_, row) =>
      Array(8).fill(null).map((_, col) => {
        if (row < 2) return "black";
        if (row > 5) return "white"; 
        return null; 
      })
    ),
  currentPlayer: "white",
  selectedPiece: null,
  validMoves: [],
  scores: { white: 0, black: 0 },
  winner: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectPiece: (state, action) => {
      const { row, col } = action.payload;
      const piece = state.board[row][col];

      if (piece && piece.includes(state.currentPlayer)) {
        const validMoves = calculateValidMoves(state.board, row, col);
        state.selectedPiece = validMoves.length > 0 ? { row, col } : null;
        state.validMoves = validMoves;
      }
    },

    movePiece: (state, action) => {
      const { fromRow, fromCol, toRow, toCol } = action.payload;
      const piece = state.board[fromRow][fromCol];

      const moveData = current(
        state.validMoves.find((move) => move.row === toRow && move.col === toCol)
      );
      if (!moveData) return;

      if (moveData.capture) {
        const { row: capturedRow, col: capturedCol } = moveData.capture;
        state.board[capturedRow][capturedCol] = null;
      }

      state.board[toRow][toCol] = piece;
      state.board[fromRow][fromCol] = null;

      if (toRow === 0 && piece === "white") {
        state.board[toRow][toCol] = "white-king";
      } else if (toRow === 7 && piece === "black") {
        state.board[toRow][toCol] = "black-king";
      }

      const nextMoves = calculateValidMoves(state.board, toRow, toCol);
      if (nextMoves.some((move) => move.capture)) {
        state.selectedPiece = { row: toRow, col: toCol };
        state.validMoves = nextMoves;
      } else {
        state.selectedPiece = null;
        state.validMoves = [];
        state.currentPlayer = state.currentPlayer === "white" ? "black" : "white";
      }

      const blackPieces = state.board.flat().filter((p) => p && p.includes("black")).length;
      const whitePieces = state.board.flat().filter((p) => p && p.includes("white")).length;

      if (blackPieces === 0) {
        state.scores.white += 1;
        state.winner = "Beyaz Kazandı!";
      } else if (whitePieces === 0) {
        state.scores.black += 1;
        state.winner = "Siyah Kazandı!";
      }
    },

    resetGame: (state) => {
      state.board = initialState.board;
      state.currentPlayer = "white";
      state.selectedPiece = null;
      state.validMoves = [];
      state.winner = null;
    },
  },
});

export const { selectPiece, movePiece, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
