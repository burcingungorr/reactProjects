import React, { useState, useEffect } from "react";
import { db } from "../config";
import { collection, getDocs } from "firebase/firestore";
import "../App.css";
const Skorlar = () => {
  const [skorListesi, setSkorListesi] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        let allScores = [];
        
//promise.all
        const scorePromises = usersSnapshot.docs.map(async (userDoc) => {
          const scoresCollection = collection(db, `users/${userDoc.id}/scores`);
          const scoresSnapshot = await getDocs(scoresCollection);

          return scoresSnapshot.docs.map((scoreDoc) => ({
            name: userDoc.data()?.name || "Anonim",
            score: scoreDoc.data().score, 
            level: scoreDoc.data().level, 
          }));
        });

        const scoresResults = await Promise.all(scorePromises);
        allScores = scoresResults.flat();

        const scoresByLevel = {
          kolay: [],
          orta: [],
          zor: [],
        };

        allScores.forEach((score) => {
          if (scoresByLevel[score.level]) {
            scoresByLevel[score.level].push(score);
          }
        });

        for (let level in scoresByLevel) {
          scoresByLevel[level].sort((a, b) => b.score - a.score); 
        }

        setSkorListesi(scoresByLevel);
      } catch (error) {
        console.error("Veri çekerken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores(); 
  }, []); 
  return (
    <div>
         <div className="liderlik-container">

      <h2 className="liderlik-baslik">Liderlik 🏆</h2>

      {loading ? (
        <p className="loading-text">Yükleniyor...</p>
      ) : (
        <div className="tables">
          {Object.keys(skorListesi).map((level) => (
            <div key={level}>
              <h3>{level.charAt(0).toUpperCase() + level.slice(1)}</h3>
              <table className="liderlik-tablosu">
                <thead>
                  <tr>
                    <th>Kullanıcı Adı</th>
                    <th>Skor</th>
                  </tr>
                </thead>
                <tbody>
                  {skorListesi[level].length > 0 ? (
                    skorListesi[level].map((veri, index) => (
                      <tr key={index}>
                        <td>{veri.name}</td>
                        <td>{veri.score}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">Henüz skor kaydı yok.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

export default Skorlar