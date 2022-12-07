import React from "react";
import Button from "../Button";
import Square from "../Square";
import { BOARD, GAME_STATUS } from "../../utils/constants";

import useGame from "../../hooks/useGame";

import { useSelector } from "react-redux";

import "./index.scss";

const Game = () => {
  const { snake, moveSnake, startGame, pauseGame, food, score, gameStatus } =
    useGame();
  const { name } = useSelector((state) => state.player);

  return (
    <div className="game" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
      <h1>
        {name} Score {score}
      </h1>
      {/* this is a checking if variable true and game is over it shows game over screen else we are playing*/}
      {gameStatus === GAME_STATUS.OVER ? (
        <div className="game__over">Game Over</div>
      ) : (
        <div className="game__box">
          {BOARD.map((row, indexRow) => (
            <div className="game__board" key={indexRow}>
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

                return <Square key={indexCol} type={type} />;
              })}
            </div>
          ))}
        </div>
      )}
      <div className="game__buttons">
        <Button onClick={startGame} children="Start" />
        {gameStatus === GAME_STATUS.IN_GAME && (
          <Button onClick={pauseGame} children="Pause" />
        )}
      </div>
    </div>
  );
};

export default Game;
