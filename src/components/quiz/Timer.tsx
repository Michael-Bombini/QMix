import React, { useState, useEffect } from "react";
import "./Timer.css";

interface Props {
  onSetTimeOver: (isTimeOver: boolean) => void;
  currentQuestion: number;
  timeOver: boolean;
  difficulty: string;
}
export default function Timer({
  onSetTimeOver,
  currentQuestion,
  timeOver,
  difficulty,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(
    difficulty === "easy" ? 5 : difficulty === "normal" ? 10 : 20
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      } else {
        clearInterval(timer);
        onSetTimeOver(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    onSetTimeOver(false);
    setTimeLeft(difficulty === "easy" ? 30 : difficulty === "normal" ? 20 : 15);
  }, [currentQuestion]);

  return (
    <div>{!timeOver && <span className="timer mx-auto">{timeLeft}</span>}</div>
  );
}
