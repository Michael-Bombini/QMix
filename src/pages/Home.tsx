import CategoryLink from "../components/quiz/CategoryLink";
import categories from "../data/categories";

import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>QMix</h1>
      <p>Choose a category to start playing.</p>
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
