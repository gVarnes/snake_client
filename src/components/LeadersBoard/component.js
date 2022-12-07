import React, { useEffect, useState } from "react";
import { gettingPlayers } from "../../api";
import "./index.scss";

const LeadersBoard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    gettingPlayers().then((data) => setPlayers(data));
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
