export const BOARD_LENGTH = 10;
export const BOARD = Array(BOARD_LENGTH).fill(Array(BOARD_LENGTH).fill(null));
export const MOVES = {
  40: [1, 0],
  38: [-1, 0],
  39: [0, 1],
  37: [0, -1],
};
export const SPEED = 200;
