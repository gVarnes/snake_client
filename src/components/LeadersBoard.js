import React, { useEffect, useState } from "react";

const LeadersBoard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/player")
      .then((data) => data.json())
      .then((res) => setPlayers(res));
  }, []);

  return (
    <div className="players">
      {players?.map((player) => {
        return (
          <p className="players__row" key={player.id}>
            {player.name} - {player.score}
          </p>
        );
      })}
    </div>
  );
};

export default LeadersBoard;
