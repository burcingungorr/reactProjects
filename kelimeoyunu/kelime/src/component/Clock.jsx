import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Clock = ({ score, onTimeUp }) => {
  const [seconds, setSeconds] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds === 0) {
      alert(`Süre bitti!\nSkorunuz: ${score}`);
      onTimeUp(); 
      navigate("/Liderlik");
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, navigate, score, onTimeUp]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div>
      <p>{formatTime(seconds)}</p>
    </div>
  );
};

export default Clock;
