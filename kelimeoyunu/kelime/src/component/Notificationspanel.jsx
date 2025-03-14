import React, { useState, useEffect } from "react";
import { db, auth } from "../config"; 
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Bell } from "lucide-react"; 
import "./Questionsscreen.css";

const Notificationspanel = () => {
  const [notificationMessages, setNotificationMessages] = useState([]); 
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [previousTopRankUserIds, setPreviousTopRankUserIds] = useState({}); 
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [hasNewNotification, setHasNewNotification] = useState(false); 

  const checkAndNotifyIfTopRankChanged = async (level) => {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);

    const userScores = [];

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();

      if (userData && userData.name) {
        const scoresRef = collection(db, `users/${userDoc.id}/scores`);
        const scoresSnapshot = await getDocs(scoresRef);

        scoresSnapshot.forEach((scoreDoc) => {
          const scoreData = scoreDoc.data();

          if (scoreData && scoreData.score !== undefined && scoreData.level === level) {
            userScores.push({
              id: userDoc.id,
              score: scoreData.score,
              name: userData.name,
              level: scoreData.level,  
            });
          }
        });
      }
    }

    userScores.sort((a, b) => b.score - a.score);

    const topRankUser = userScores[0];

    if (topRankUser && topRankUser.id !== previousTopRankUserIds[level]) {
      const message = `🏆 ${topRankUser.name} ${level} seviyede 1. sırada!`;

      setNotificationMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.level !== level), 
        { message, level }, 
      ]);
      setIsNotificationPanelOpen(true);
      setHasNewNotification(true);

      setPreviousTopRankUserIds((prevState) => ({
        ...prevState,
        [level]: topRankUser.id, 
      }));

      const usersToNotify = userScores.map((user) => user.id);

      for (const userId of usersToNotify) {
        await addDoc(collection(db, `users/${userId}/notifications`), {
          message: message,
          level,
        });
      }
    }
  };

  useEffect(() => {
    if (isFirstLogin) {
      const userUID = auth.currentUser?.uid;
      if (userUID) {
        ["kolay", "orta", "zor"].forEach((level) => {
          checkAndNotifyIfTopRankChanged(level);
        });
      }

      setIsFirstLogin(false);
    }
  }, [isFirstLogin]);

  const toggleNotificationPanel = () => {
    setIsNotificationPanelOpen(!isNotificationPanelOpen);
    setHasNewNotification(false);
  };

  return (
    <div>
      <div
        className={`notification-icon ${hasNewNotification ? "new-notification" : ""} `}
        onClick={toggleNotificationPanel}
        style={{ cursor: "pointer" }}
      >
        <Bell />
      </div>

      {isNotificationPanelOpen && (
        <div className="notification-panel">
          {notificationMessages.map((notification, index) => (
            <p key={index}>
              {notification.message}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notificationspanel;
