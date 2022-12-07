import React, { useEffect } from "react";
import Button from "./Button";
import Square from "./Square";
import { BOARD } from "../utils/constants";

import useGame from "../hooks/useGame";

import { useSelector } from "react-redux";

const Game = () => {
  const { snake, endScreen, moveSnake, startGame, pauseGame, food, score } =
    useGame();
  const { name } = useSelector((state) => state.player);

  useEffect(() => {
    console.log(score);
  }, [score]);

  return (
    <div className="game" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
      <h1>
        {name} Score {score}
      </h1>
      {/* this is a checking if variable true and game is over it shows game over screen else we are playing*/}
      {endScreen ? (
        <div className="endscreen">Game Over</div>
      ) : (
        <div className="box">
          {BOARD.map((row, indexRow) => (
            <div className="flex" key={indexRow}>
              {row.map((col, indexCol) => {
                let type =
                  snake.some(
                    (elem) => elem[0] === indexRow && elem[1] === indexCol
                  ) && "snake";
                if (type !== "snake")
                  type =
                    food.pos[0] === indexRow &&
                    food.pos[1] === indexCol &&
                    "food";
                // console.log(food[0]);

                return <Square key={indexCol} type={type} />;
              })}
            </div>
          ))}
        </div>
      )}
      <div className="buttons">
        <Button onClick={startGame} children="Start" />
        <Button onClick={pauseGame} children="Pause" />
      </div>
    </div>
  );
};

export default Game;
