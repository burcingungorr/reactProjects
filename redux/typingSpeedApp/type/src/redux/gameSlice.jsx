import { createSlice } from "@reduxjs/toolkit";

const wordList = [
    "yazılım", "klavye", "hızlı", "test", "hata", "doğru", "bilgisayar", "ekran", "fare", "klavye",
    "kod", "program", "çalışma", "veri", "algoritma", "donanım", "uygulama", "internet", "tarayıcı", "sunucu",
    "güvenlik", "sistem", "ağ", "yazıcı", "veritabanı", "işlemci", "hafıza", "piksel", "buton", "depolama"
  ];
  
const initialState = {
  words: [...wordList], 
  inputValue: "",
  correctWords: 0,
  wrongWords: 0,
  gameStatus: "idle", // bekleme
  timeLeft: 30, 
  typedWords: [],
  currentWordIndex: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStatus = "playing";
      state.correctWords = 0;
      state.wrongWords = 0;
      state.timeLeft = 30; 
      state.typedWords = [];
      state.inputValue = "";
      state.currentWordIndex = 0;
    },
    updateInput: (state, action) => {
      state.inputValue = action.payload;
    },
    checkWord: (state) => {
      const currentWord = state.words[state.currentWordIndex];

      if (state.inputValue.trim() === currentWord) {
        state.correctWords += 1;
        state.typedWords[state.currentWordIndex] = { word: currentWord, isCorrect: true };
      } else {
        state.wrongWords += 1;
        state.typedWords[state.currentWordIndex] = { word: state.inputValue.trim(), isCorrect: false };
      }

      state.inputValue = "";
      state.currentWordIndex = (state.currentWordIndex + 1) % state.words.length;
    },
    decrementTime: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
      if (state.timeLeft === 0) {
        state.gameStatus = "finished"; 
      }
    },
    restartGame: (state) => {
        return { ...initialState, words: [...wordList] };
      },
  },
});

export const { startGame, updateInput, checkWord, decrementTime,restartGame } = gameSlice.actions;
export default gameSlice.reducer;
