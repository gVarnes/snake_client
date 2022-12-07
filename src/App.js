import React from "react";
import Game from "./components/Game";
import LeadersBoard from "./components/LeadersBoard";
import Register from "./components/Register";

import { useSelector } from "react-redux";

const App = () => {
  const { name } = useSelector((state) => state.player);

  return (
    <div className="app">
      {name === "" ? <Register /> : <Game />}
      <LeadersBoard />
    </div>
  );
};

export default App;
