import { useState, useEffect } from "react";

import {
  BOARD_LENGTH,
  FOOD_BORDERS,
  FOOD_TYPES,
  GAME_STATUS,
  MOVES,
  SPEED_SETTINGS,
} from "./../utils/constants";
import { checkPostion, collision } from "../utils/helpers";

import { useSelector } from "react-redux";

const useGame = () => {
  const [snake, setSnake] = useState([[3, 2]]);
  const [direction, setDirection] = useState(null);
  const [head, setHead] = useState(snake[snake.length - 1]);
  const [score, setScore] = useState(1);
  const [speed, setSpeed] = useState({
    spd: null,
    speedBorder: SPEED_SETTINGS.SPEED_BORDER,
  });
  const [food, setFood] = useState({
    pos: [1, 1],
    type: FOOD_TYPES.FIRST,
  });
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.NOT_STARTED);

  const { name } = useSelector((state) => state.player);

  useEffect(() => {
    setHead(snake[snake.length - 1]);
    const interval = gameLoop();
    return () => clearInterval(interval);
  }, [snake, gameStatus]);

  const calcNewSpeed = () => {
    if (score >= speed.speedBorder && speed.spd > SPEED_SETTINGS.MIN_SPEED) {
      setSpeed((prev) => ({
        spd: prev.spd - SPEED_SETTINGS.SPEED_INCREASE,
        speedBorder: prev.speedBorder + 5,
      }));
    }
  };

  const startGame = () => {
    direction === null ? setDirection([0, -1]) : setDirection(direction);
    setSpeed((prev) => ({ ...prev, spd: SPEED_SETTINGS.SPEED }));

    setGameStatus(GAME_STATUS.IN_GAME);

    console.log(speed);
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

    setSpeed({ spd: null, speedBorder: SPEED_SETTINGS.SPEED_BORDER });

    setGameStatus(GAME_STATUS.OVER);
  };

  const pauseGame = () => {
    setDirection(direction);
    setSpeed({ spd: null, speedBorder: SPEED_SETTINGS.SPEED_BORDER });
    setGameStatus(GAME_STATUS.PAUSE);
    console.log(direction);
  };

  const changeFoodType = () => {
    if ((score + 1) % FOOD_BORDERS.THIRD === 0) {
      //condition for the third type of food
      const type = FOOD_TYPES.THIRD;
      setFood((prev) => ({ ...prev, type }));
      setScore((prev) => prev + type);
      return;
    } else if ((score + 1) % FOOD_BORDERS.SECOND === 0) {
      //condition for the second type of food
      const type = FOOD_TYPES.SECOND;
      setFood((prev) => ({ ...prev, type }));
      setScore((prev) => prev + type);
      return;
    }
    //default condition for food
    const type = FOOD_TYPES.FIRST;
    setFood((prev) => ({ ...prev, type }));
    setScore((prev) => prev + type);
    return;
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

    setFood((prev) => ({ ...prev, pos: newFood }));
  };

  const moveSnake = ({ keyCode }) => {
    return keyCode >= 37 && keyCode <= 40 && setDirection(MOVES[keyCode]);
  };

  const gameLoop = () => {
    const timerId = setTimeout(() => {
      if (gameStatus === GAME_STATUS.IN_GAME) {
        const newSnake = [...snake];

        const head = [
          checkPostion(newSnake[newSnake.length - 1][0] + direction[0]),
          checkPostion(newSnake[newSnake.length - 1][1] + direction[1]),
        ];

        newSnake.push(head);

        let spliceIntex = 1;
        //condition if food was ate
        //we ganarate new food, new type of food and speedBorder the speed by the condiontion inside the function
        if (head[0] === food.pos[0] && head[1] === food.pos[1]) {
          spliceIntex = 0;
          changeFoodType();
          generateFood();
          calcNewSpeed();
        }
        if (collision(head, snake)) endGame();

        setSnake(newSnake.slice(spliceIntex));
      }
    }, speed.spd);
    return timerId;
  };

  return {
    snake,
    [speed]: speed.spd,
    food,
    direction,
    head,
    score,
    gameStatus,
    moveSnake,
    startGame,
    pauseGame,
  };
};

export default useGame;
