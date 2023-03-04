import axios from "axios";
import { useEffect, useState } from "react";
import PlayerCard from "../components/quiz/PlayerCard";
import { PlayerStat } from "../interfaces/PlayerStat";

export default function ScoreBoard() {
  const [players, setPlayers] = useState<PlayerStat[]>([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get(import.meta.env.VITE_DB_URL);
      if (resp.data) {
        const data = Object.values(resp.data) as PlayerStat[];
        const sortedData = data.sort((a, b) => b.points - a.points);
        setPlayers(sortedData);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {players.map((player, ind) => (
        <PlayerCard
          key={player.username + ind + player.category}
          username={player.username}
          difficulty={player.difficulty}
          position={ind + 1}
          points={player.points}
          category={player.category}
        />
      ))}
    </div>
  );
}
