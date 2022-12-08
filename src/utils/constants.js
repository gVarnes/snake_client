export const BOARD_LENGTH = 10;
export const BOARD = Array(BOARD_LENGTH).fill(Array(BOARD_LENGTH).fill(null));
export const MOVES = {
  40: [1, 0],
  38: [-1, 0],
  39: [0, 1],
  37: [0, -1],
};

export const SPEED_SETTINGS = {
  SPEED: 500,
  SPEED_INCREASE: 100,
  SPEED_BORDER: 50,
  MIN_SPEED: 100,
};
export const FOOD_TYPES = {
  FIRST: 1,
  SECOND: 5,
  THIRD: 10,
};

export const FOOD_BORDERS = {
  SECOND: 10,
  THIRD: 50,
};

export const GAME_STATUS = {
  NOT_STARTED: "not_started",
  IN_GAME: "in_game",
  PAUSE: "pause",
  OVER: "over",
};
