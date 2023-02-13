import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { Question } from "../interfaces/Question";
import difficulties from "../data/difficulties";
import "./Quiz.css";
import QuizGame from "../components/quiz/QuizGame";
export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [chosenDifficulty, setChosenDifficulty] = useState("");
  const [userName, setUserName] = useState("");
  const [start, setStart] = useState(false);
  const [errors, setErrors] = useState(false);

  let { state } = useLocation();
  const {categoryId , categoryName} = state;
  if (!state) {
    Navigate({ to: "/" });
  }
  console.log(state);
  

  function checkGame() {
    const user = userName.trim();
    setErrors(false);
    if (user && chosenDifficulty) {
      setStart(true);
    } else {
      setErrors(true);
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (start) {
        const resp = await fetch(
          "https://opentdb.com/api.php?amount=10&category=31"
        );
        const data = await resp.json();
        setQuestions(data.results);
      }
    }
    fetchData();
  }, [start]);

  return (
    <div className="h-100">
      {!start && (
        <div className="start">
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your Username"
            maxLength={30}
          />
          <div className="difficulty flex flex-wrap justify-center">
            {difficulties.map((difficulty) => (
              <button key={difficulty.difficultyName}
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
          <button onClick={checkGame}>Start Game!</button>
        </div>
      )}
      {start && <QuizGame username={userName} difficulty={chosenDifficulty} categoryId={categoryId} categoryName={categoryName}  />}
    </div>
  );
}
