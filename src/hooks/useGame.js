import { useState, useEffect } from "react";

import { BOARD_LENGTH, MOVES, SPEED } from "./../utils/constants";
import { checkPostion } from "../utils/helpers";

import { useSelector } from "react-redux";

const useGame = () => {
  const [snake, setSnake] = useState([[3, 2]]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [food, setFood] = useState([1, 1]);
  const [direction, setDirection] = useState(null);
  const [head, setHead] = useState(snake[snake.length - 1]);
  const [endScreen, setEndScreen] = useState(false);

  const { name } = useSelector((state) => state.player);

  useEffect(() => {
    setHead(snake[snake.length - 1]);
    const interval = gameLoop();

    return () => clearInterval(interval);
  }, [snake, gameOver]);

  const speedIncrease = () => {
    if (snake.length % 5 === 0) console.log("2");
  };

  const startGame = () => {
    direction === null ? setDirection([0, -1]) : setDirection(direction);
    setSpeed(SPEED);
    setGameOver(false);
  };
  const endGame = () => {
    //fetch...
    fetch("http://localhost:3001/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        score: snake.length,
      }),
    })
      .then((data) => data.json)
      .then((res) => console.log(res));

    setSpeed(null);
    setGameOver(true);
    setEndScreen(true);
  };

  const pauseGame = () => {
    setDirection(direction);
    setSpeed(null);
    setGameOver(true);
  };

  const generateFood = () => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * BOARD_LENGTH),
        Math.floor(Math.random() * BOARD_LENGTH),
      ];
    } while (
      snake.some((elem) => elem[0] === newFood[0] && elem[1] === newFood[1])
    );

    setFood(newFood);
  };

  const moveSnake = ({ keyCode }) => {
    return keyCode >= 37 && keyCode <= 40 && setDirection(MOVES[keyCode]);
  };

  const collision = (piece, snk) => {
    for (const part of snk) {
      if (piece[0] === part[0] && piece[1] === part[1]) return true;
    }
    return false;
  };

  const gameLoop = () => {
    const timerId = setTimeout(() => {
      if (!gameOver) {
        const newSnake = [...snake];

        const head = [
          checkPostion(newSnake[newSnake.length - 1][0] + direction[0]),
          checkPostion(newSnake[newSnake.length - 1][1] + direction[1]),
        ];

        newSnake.push(head);

        let spliceIntex = 1;
        if (head[0] === food[0] && head[1] === food[1]) {
          spliceIntex = 0;
          generateFood();
        }
        if (collision(head, snake)) endGame();
        speedIncrease();
        setSnake(newSnake.slice(spliceIntex));
      }
    }, speed);
    return timerId;
  };

  return {
    snake,
    speed,
    gameOver,
    food,
    direction,
    head,
    endScreen,
    moveSnake,
    startGame,
    pauseGame,
  };
};

export default useGame;
