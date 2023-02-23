import React, { useState, useEffect } from "react";
import "./Timer.css";

interface Props {
  onSetTimeOver: (isTimeOver: boolean) => void;
  currentQuestion: number;
  timeOver: boolean;
}
export default function Timer({
  onSetTimeOver,
  currentQuestion,
  timeOver,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(30);

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
    setTimeLeft(30);
  }, [currentQuestion]);

  return (
    <div>{!timeOver && <span className="timer mx-auto">{timeLeft}</span>}</div>
  );
}
