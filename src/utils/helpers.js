import { BOARD_LENGTH } from "./constants";

export const checkPostion = (position) => {
  switch (true) {
    case position >= BOARD_LENGTH:
      return 0;
    case position < 0:
      return BOARD_LENGTH - 1;
    default:
      return position;
  }
};

export const collision = (piece, snk) => {
  for (const part of snk) {
    if (piece[0] === part[0] && piece[1] === part[1]) return true;
  }
  return false;
};
