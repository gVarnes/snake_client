import React, { useEffect } from "react";
import { BOARD } from "./../utils/constants";
import Square from "./Square";

import useGame from "../hooks/useGame";

const Board = () => {
  const { snake, food } = useGame();

  useEffect(() => {
    console.log("snake", snake);
    console.log("food", food);
  }, [snake, food]);

  return (
    <div className="box">
      {BOARD.map((row, indexRow) => (
        <div className="flex" key={indexRow}>
          {row.map((col, indexCol) => {
            let type =
              snake.some((elem) => {
                console.log(elem[0]);
                return elem[0] === indexRow && elem[1] === indexCol;
              }) && "snake";
            if (type !== "snake")
              type = food[0] === indexRow && food[1] === indexCol && "food";
            // console.log(food[0]);

            return <Square key={indexCol} type={type} />;
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
