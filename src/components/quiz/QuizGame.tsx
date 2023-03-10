import React, { useEffect, useState } from "react";
import { Question } from "../../interfaces/Question";
import { UserChoices } from "../../interfaces/UserChoices";
import Timer from "./Timer";
import "./QuizGame.css";
import RenderQuestions from "./RenderQuestions";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import axios from "axios";
import he from "he";

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
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const amount =
        difficulty === "easy" ? 5 : difficulty === "normal" ? 10 : 20;

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

  useEffect(() => {
    async function asyncEffect() {
      setSelectedAnswer("");
      if (!loading && !questions[currentQuestion]) {
        const data = {
          username: username,
          category: categoryName,
          difficulty: difficulty,
          points: points,
        };
        const resp = await axios.post(import.meta.env.VITE_DB_URL, data);
      }
    }
    asyncEffect();
  }, [currentQuestion]);

  useEffect(() => {
    if (timeOver && !selectedAnswer) {
      const decodedAnswer = he.decode(
        questions[currentQuestion].correct_answer
      );
      const tempAnswer = DOMPurify.sanitize(decodedAnswer);
      MySwal.fire({
        title: "Time Out!",
        icon: "question",
        text: `The correct answer was ${tempAnswer}`,
      });
      setSelectedAnswer("");
    }
  }, [timeOver]);

  useEffect(() => {
    if (questions[currentQuestion] && selectedAnswer) {
      if (selectedAnswer === questions[currentQuestion].correct_answer) {
        MySwal.fire({
          title: "Correct Answer!",
          iconHtml: "&#x1F600;",
        });
        setPoints((prev) => prev + 1);
      } else if (
        questions[currentQuestion] &&
        selectedAnswer !== questions[currentQuestion].correct_answer
      ) {
        const decodedAnswer = he.decode(
          questions[currentQuestion].correct_answer
        );
        const tempAnswer = DOMPurify.sanitize(decodedAnswer);
        MySwal.fire({
          title: "Wrong Answer",
          iconHtml: "&#x1F622;",
          text: `The correct answer was ${tempAnswer}`,
        });
      }
      setTimeOver(true);
    }
  }, [selectedAnswer]);

  return (
    <div className="h-100 flex align-center justify-center">
      {loading && <div className="loading">Loading...</div>}
      {!loading && questions[currentQuestion] && (
        <div className="flex align-center justify-center flex-col">
          <Timer
            onSetTimeOver={setTimeOver}
            currentQuestion={currentQuestion}
            timeOver={timeOver}
            difficulty={difficulty}
          />
          <div
            className="currentQuestion"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(questions[currentQuestion].question),
            }}
          ></div>
          {!timeOver && (
            <RenderQuestions
              questions={questions[currentQuestion].incorrect_answers}
              answer={questions[currentQuestion].correct_answer}
              setSelectedAnswer={setSelectedAnswer}
            />
          )}
          <button
            className="nextQuestionBtn"
            disabled={!timeOver}
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
          >
            Next question
          </button>
        </div>
      )}
      {!loading && !questions[currentQuestion] && (
        <div className="flex flex-col align-center container">
          <p>Congratulation you've scored {points} points</p>
          <Link className="nextQuestionBtn" to={"/"}>
            Go to home
          </Link>
        </div>
      )}
    </div>
  );
}
