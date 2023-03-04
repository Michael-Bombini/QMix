import "./PlayerCard.css";
interface Props {
  username: string;
  difficulty: string;
  points: number;
  category: string;
  position: number;
}

export default function PlayerCard({
  username,
  difficulty,
  points,
  category,
  position
}: Props) {
  return (
    <div className="player-card">
            <div className={`player-position position-${position}`}>{position}</div>

    <div className="card-content">
      <div className="player-info">
        <div className="player-name">{username}</div>
        <div className="player-category">{category}</div>
      </div>
      <div className="player-stats">
        <div className="player-difficulty">{difficulty}</div>
        <div className="player-points">{points} pts</div>
      </div>
    </div>
  </div>



  );
}
