import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { Question } from "../interfaces/Question";
import difficulties from "../data/difficulties";
import "./Quiz.css";
export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [chosenDifficulty, setChosenDifficulty] = useState("");
  const [userName, setUserName] = useState("");
  const [start, setStart] = useState(false);

  let { state } = useLocation();
  if (!state) {
    Navigate({ to: "/" });
  }

  function checkGame() {
    if (userName && chosenDifficulty) {
      setStart(true);
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
              <button
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

          <button onClick={checkGame}>Start Game!</button>
        </div>
      )}
      {start && <p>domande quiz</p>}
    </div>
  );
}
