import React from "react";
import "./index.scss";

const Square = ({ type }) => {
  return <div className={`square ${type}`}></div>;
};

export default Square;
