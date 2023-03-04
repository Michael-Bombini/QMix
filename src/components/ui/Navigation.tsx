import { Link } from "react-router-dom";
import "./Navigation.css";
export default function Navigation() {
  return (
    <nav className="navbar">
      <Link className="logo" to={"/"}>
        QMix
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={"/scores"} className="nav-link">
            Leaderboard
          </Link>
        </li>
      </ul>
    </nav>
  );
}
