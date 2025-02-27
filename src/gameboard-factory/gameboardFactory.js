import {Ship} from "../ships-factory/Ships";

function Gameboard() {
  const gameboard = [];
  const missedAtks = [];
  const successfulAtks = [];

  for (let rows = 0; rows < 10; rows++) {
    gameboard[rows] = [];

    for (let cols = 0; cols < 10; cols++) {
      gameboard[rows].push([]);
    }
  }

  // placing ships;
  const placeShip = (ship, row, col) => {
    gameboard[row][col] = ship;
  };

  const receiveAttack = (row, col) => {
    if(gameboard[row][col].length > 0) {
      return true;
    }

    return false;
  };

  return { gameboard, placeShip, receiveAttack, missedAtks, successfulAtks };
}

export {Gameboard};