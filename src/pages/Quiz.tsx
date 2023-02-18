import { useState } from "react";
import { Navigate, useLocation } from "react-router";
import difficulties from "../data/difficulties";
import "./Quiz.css";
import QuizGame from "../components/quiz/QuizGame";
export default function Quiz() {
  const [chosenDifficulty, setChosenDifficulty] = useState("");
  const [userName, setUserName] = useState("");
  const [start, setStart] = useState(false);
  const [errors, setErrors] = useState(false);

  let { state } = useLocation();

  if (!state) {
    Navigate({ to: "/" });
    return null;
  }

  const { categoryId, categoryName } = state;

  function checkGame() {
    const user = userName.trim();
    setErrors(false);
    if (user && chosenDifficulty) {
      setStart(true);
    } else {
      setErrors(true);
    }
  }

  return (
    <div className="h-100">
      {!start && (
        <div className="start">
          <div className="relative">
            <h1>Lets Play</h1>
            <span className="absolute abs1">?</span>
            <span className="absolute abs2">?</span>
            <span className="absolute abs3">?</span>
          </div>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => setUserName(e.target.value.trim())}
            placeholder="Enter your Username"
            maxLength={30}
          />
          <div className="difficulty flex flex-wrap justify-center g-24">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.difficultyName}
                style={{
                  backgroundColor: difficulty.difficultyColor,
                  boxShadow:
                    difficulty.difficultyName === chosenDifficulty
                      ? `0 0 10px 10px ${difficulty.difficultyColor}`
                      : "none",
                }}
                onClick={() => setChosenDifficulty(difficulty.difficultyName)}
                className={
                  difficulty.difficultyName === chosenDifficulty ? "active" : ""
                }
              >
                {difficulty.difficultyName}
              </button>
            ))}
          </div>
          {errors && (
            <p className="errors">
              Scegli la difficoltà e imposta il tuo username prima di iniziare a
              giocare
            </p>
          )}
          <button className="startGame" onClick={checkGame}>
            Start Game!
          </button>
        </div>
      )}
      {start && (
        <QuizGame
          username={userName}
          difficulty={chosenDifficulty}
          categoryId={categoryId}
          categoryName={categoryName}
        />
      )}
    </div>
  );
}
