import DOMPurify from "dompurify";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Question } from "../../interfaces/Question";
import "./RenderQuestion.css";

interface Props {
  questions: string[];
  answer: string;
  setSelectedAnswer: (answer: string) => void;
}

export default function RenderQuestions({
  questions,
  answer,
  setSelectedAnswer,
}: Props) {
  const [shuffledQuestions, setShuffledQuestions] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = [...questions];
    const answerIndex = Math.floor(Math.random() * shuffled.length);
    shuffled.splice(answerIndex, 0, answer);
    setShuffledQuestions(shuffled);
  }, [questions, answer]);

  return (
    <div className="questionsGrid">
      {shuffledQuestions.map((question) => (
        <button
          key={question}
          className="question"
          onClick={() => setSelectedAnswer(question)}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(question),
          }}
        >
        
        </button>
      ))}
    </div>
  );
}
