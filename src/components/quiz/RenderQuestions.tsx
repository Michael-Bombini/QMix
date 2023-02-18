import { useEffect, useState } from "react";
import './RenderQuestion.css';

interface Props{
    questions: string[];
    answer: string;
}


export default function RenderQuestions({questions, answer} : Props) {

    const [shuffledQuestions, setShuffledQuestions] = useState<string[]>([]);

    useEffect(() => {
      const shuffled = [...questions];
      const answerIndex = Math.floor(Math.random() * shuffled.length);
      shuffled.splice(answerIndex, 0, answer);
      setShuffledQuestions(shuffled);
    }, [questions, answer]);
  

  return (
    <div className="questionsGrid">{shuffledQuestions.map((question) => <button key={question} className="question">{question}</button>)}</div>
  )
}
