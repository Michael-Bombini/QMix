import React, { useEffect, useState } from "react";
import { Question } from "../../interfaces/Question";
import { UserChoices } from "../../interfaces/UserChoices";
import Timer from "./Timer";
import "./QuizGame.css";
import RenderQuestions from "./RenderQuestions";
import DOMPurify from "dompurify";

export default function QuizGame({
  username,
  difficulty,
  categoryId,
  categoryName,
}: UserChoices) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeOver, setTimeOver] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const amount =
        difficulty === "easy" ? 5 : difficulty === "normal" ? 10 : 20;
      console.log(amount);

      try {
        const resp = await fetch(
          `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`
        );

        const data = await resp.json();
        setQuestions(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="h-100 flex align-center justify-center">
      {loading && <div className="loading">Loading...</div>}
      {!loading && questions[currentQuestion] && (
        <div className="flex align-center justify-center flex-col">
          <Timer
            onSetTimeOver={setTimeOver}
            currentQuestion={currentQuestion}
            timeOver={timeOver}
          />
          <div
            className="currentQuestion"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(questions[currentQuestion].question),
            }}
          ></div>
          <RenderQuestions
            questions={questions[currentQuestion].incorrect_answers}
            answer={questions[currentQuestion].correct_answer}
          />

          <button
            className="nextQuestionBtn"
            disabled={!timeOver}
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
          >
            Next question
          </button>
          {timeOver && <p>tempo fine</p>}
        </div>
      )}
      {!loading && !questions[currentQuestion] && <p>Finite le domande</p>}
    </div>
  );
}
