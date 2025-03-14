import React, { useState, useEffect } from "react";
import { db } from "../config";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "../App.css";

const Table = () => {
  const [skorListesi, setSkorListesi] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserScores = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const scoresCollection = collection(db, `users/${user.uid}/scores`);
        const scoresSnapshot = await getDocs(scoresCollection);
        const scores = scoresSnapshot.docs.map((doc) => ({
          id: doc.id,
          score: doc.data().score,
          level: doc.data().level,
        }));

        scores.sort((a, b) => b.score - a.score);

        setSkorListesi(scores);
      } catch (error) {
        console.error("Skorları çekerken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserScores();
  }, [user]);

  return (
    <div className="liderlik-container">
      <h2 className="liderlik-baslik">Skorlarım</h2>

      {loading ? (
        <p className="loading-text">Yükleniyor...</p>
      ) : skorListesi.length > 0 ? (
        <div className="table2">
        <table className="liderlik-tablosu" style={{marginTop:"50px"}}>
          <thead>
            <tr>
              <th>Skor</th>
              <th>Seviye</th>
            </tr>
          </thead>
          <tbody>
            {skorListesi.map((veri, index) => (
              <tr key={veri.id}>
                <td>{veri.score}</td>
                <td>{veri.level}</td> 
              </tr>
            ))}
          </tbody>
        </table>    </div>

      ) : (
        <p className="no-score-text">Henüz skor kaydınız bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default Table;
