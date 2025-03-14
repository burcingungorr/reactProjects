import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Answer from "./Answer";
import "./Questionsscreen.css";
import Info from "./Info";
import Clock from "./Clock";
import { auth, db } from "../config";
import { collection, addDoc } from "firebase/firestore";
import { First } from "./First";
import { Second } from "./Second";
import Third from "./Third";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export default function Kelime() {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(null);

  const handleLevelSelect = (selectedLevel) => {
    setLevel(selectedLevel);
    setGameStarted(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {gameStarted ? (
        <KelimeGetir level={level} />
      ) : (
        <div className="container" style={{ textAlign: "center", padding: "20px", display: "block" }}>
          <Info />
          <button className="btn-start">
            Seviyeni Seç 
            <br />
            ve
            <br />
            BAŞLA
          </button>
          <div className="levels">
            <First onSelect={() => handleLevelSelect("kolay")} />
            <Second onSelect={() => handleLevelSelect("orta")} />
            <Third onSelect={() => handleLevelSelect("zor")} />
          </div>
        </div>
      )}
    </QueryClientProvider>
  );
}

function KelimeGetir({ level }) {
  const [selectedWord, setSelectedWord] = useState(null);
  const [showWord, setShowWord] = useState(false);
  const [score, setScore] = useState(0);

  const user = auth.currentUser;

  const { data: randomWord, refetch: getRandomWord } = useQuery({
    queryKey: ["randomWord", level],
    queryFn: async () => {
      const response = await fetch("/TDK_Sözlük_Kelime_Listesi.txt");
      const text = await response.text();
      const kelimeler = text.split("\n").map((k) => k.trim()).filter((k) => k);



      const filteredWords = kelimeler.filter((word) => {
        if (level === "kolay") return word.length <= 4;
        if (level === "orta") return word.length <= 7;
        return word.length > 7; 
      });

      if (filteredWords.length === 0) {
        alert("Hata");
      }

      const word = filteredWords[Math.floor(Math.random() * filteredWords.length)];
      setSelectedWord(word);
      console.log(word);
      return word;
    },
    enabled: false,
  });

  const { data: meaning, refetch: getMeaning } = useQuery({
    queryKey: ["wordMeaning", selectedWord],
    queryFn: async () => {
      if (!selectedWord) return "Soru bulunamadı.";
  
      const response = await fetch(`https://sozluk.gov.tr/gts?ara=${selectedWord}`);
      const data = await response.json();
  
      return data[0]?.anlamlarListe?.[0]?.anlam || ".";
    },
  });
  
  const handleGetWord = async () => {
    try {
      await getRandomWord();
      setShowWord(false);
    } catch (error) {
      console.error("Hata:", error.message);
    }
  };
  

  useEffect(() => {
    if (meaning === ".") {
      setTimeout(() => {
        handleGetWord();
      }, 1);
    }
  }, [meaning]);
  
  
  useEffect(() => {
    handleGetWord();
  }, [level]);

  const handleCorrectAnswer = () => {
    setScore((prevScore) => prevScore + 1);
    setTimeout(() => {
      handleGetWord();
    }, 1000);
  };

  const handleTimeUp = async () => {
    if (!user) return;
  
    try {
      const scoresCollection = collection(db, `users/${user.uid}/scores`);
      await addDoc(scoresCollection, { score, level }); 
      toast("Skorun kaydedildi!"); 
    } catch (error) {
      console.error("Skor kaydedilirken hata oluştu:", error);
    }
  };
  
  
  return (

    <div className="container2" style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "10px 20px" }}>
        <p style={{ marginLeft: "20px" }}>Skor: {score}</p>

        <div style={{ marginRight: "50px" }}>
          <Clock score={score} onTimeUp={handleTimeUp} />
        </div>
      </div>

      {selectedWord && (
        <p style={{ marginBottom: "50px" }}>
          <strong>Soru:</strong> {meaning}
        </p>
      )}

      <Answer
        showWord={showWord}
        selectedWord={selectedWord}
        onCorrectAnswer={handleCorrectAnswer}
      />

      {selectedWord && !showWord && (
        <>
          <button onClick={handleGetWord} className="btn-1">
            PAS
          </button>
        </>
      )}
    </div>
  );
}
