import React, { useState, useEffect } from "react";

const Answer = ({ showWord, selectedWord, onCorrectAnswer }) => {
  if (!selectedWord) return null;

  const [revealedLetters, setRevealedLetters] = useState(new Set());
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [harfHakki, setHarfHakki] = useState(5); 

  useEffect(() => {
    setRevealedLetters(new Set());
    setUserInput("");
    setMessage("");
  }, [selectedWord]);


  const revealRandomLetter = () => {
    if (harfHakki <= 0) return; 

    if (revealedLetters.size >= selectedWord.length) 
      return alert("Tüm harfler açıldı");

    const hiddenIndices = selectedWord
      .split("")
      .map((char, index) => (revealedLetters.has(index) ? null : index))
      .filter((index) => index !== null);

    if (hiddenIndices.length === 0) return;

    const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
    setRevealedLetters(new Set([...revealedLetters, randomIndex]));
    setHarfHakki(harfHakki - 1); 
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === selectedWord.toLowerCase()) {
      setMessage(" Doğru!");

      onCorrectAnswer();
    } else {
      setMessage("Yanlış tekrar dene");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <p style={{ marginBottom: "80px" }}>
        <strong>Cevap:</strong>{" "}
        {showWord
          ? selectedWord
          : selectedWord
              .split("")
              .map((char, index) => (revealedLetters.has(index) ? char : "_"))
              .join(" ")}
      </p>

      {!showWord && (
        <>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px", marginBottom: "30px" }}>
            <button onClick={checkAnswer} className="btn-3">Cevapla</button>
            <button onClick={revealRandomLetter} className="btn-4" disabled={harfHakki <= 0}>
              Harf Aç ({harfHakki})
            </button>
          </div>
          <input
            type="text"
            value={userInput}
            onChange={handleChange}
            style={{
              marginTop: "5px",
              fontSize: "18px",
              padding: "5px",
              marginBottom: "15px",
            }}
            placeholder="Cevap"
          />
        </>
      )}

      {message && <p style={{ fontWeight: "bold" }}>{message}</p>}
    </div>
  );
};

export default Answer;
