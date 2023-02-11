import { useEffect, useState } from "react";
import CategoryLink from "../components/quiz/CategoryLink";
import categories from "../data/categories";
import { Question } from "../interfaces/Question";

import "./Home.css";

function Home() {
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

  return (
    <div className="home">
      <h1>QMix</h1>
      <p>Choice a category to start play</p>
      <div className="container">
        <ul className="flex g-12 justify-center align-center">
          {categories.map((category) => (
            <CategoryLink
              key={category.categoryId}
              categoryColor={category.categoryColor}
              categoryName={category.categoryName}
              categoryId={category.categoryId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
