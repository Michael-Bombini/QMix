import { Route, Routes } from "react-router";
import Home from "../../pages/Home";
import Quiz from "../../pages/Quiz";
import ScoreBoard from "../../pages/ScoreBoard";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scores" element={<ScoreBoard />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>
    </>
  );
}
