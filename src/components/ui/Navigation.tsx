import { Link } from "react-router-dom";
import "./Navigation.css";
export default function Navigation() {
  return (
    <nav className="navbar">
      <Link className="logo" to={"/"}>
        Quiz Game
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={"/"} className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/scores"} className="nav-link">
            Scores
          </Link>
        </li>
      </ul>
    </nav>
  );
}
