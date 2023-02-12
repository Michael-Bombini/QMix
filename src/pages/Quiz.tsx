import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { Question } from "../interfaces/Question";

export default function Quiz() {
  let { state } = useLocation();
  if (!state) {
    Navigate({ to: "/" });
  }
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        "https://opentdb.com/api.php?amount=10&category=31"
      );
      const data = await resp.json();
      setQuestions(data.results);
    }
    fetchData();
  }, []);


  return <div>{JSON.stringify(state)}</div>;
}
