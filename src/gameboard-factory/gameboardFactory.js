import { Ship } from "../ships-factory/Ships";

function Gameboard() {
  const gameboard = [];
  const missedAtks = [];
  const successfulAtks = [];
  const attacks = [];

  // Initialize the board with null values
  for (let rows = 0; rows < 10; rows++) {
    gameboard[rows] = [];
    for (let cols = 0; cols < 10; cols++) {
      gameboard[rows].push(null); // Use null instead of empty array
    }
  }

  const placeShip = (ship) => {
    const shipLength = ship.length;
    let placed = false;

    while (!placed) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);

      // Check if the ship would go off the board
      if (col + shipLength > 10) {
        continue; // Try a new position
      }

      let canPlace = true;
      // Check if any position already has a ship
      for (let i = 0; i < shipLength; i++) {
        if (gameboard[row][col + i] !== null) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < shipLength; i++) {
          gameboard[row][col + i] = ship; // Place the ship
        }
        placed = true; // Now the ship is placed
        return [row, col]; // Return the coordinates where ship was placed
      }
    }
  };

  const receiveAttack = (row, col) => {
    console.log([row, col]);
    if (gameboard[row][col] !== null) {
      // It's a ship - hit it
      successfulAtks.push([row, col]); // Push as array for consistency
      const ship = gameboard[row][col];
      ship.hit();
      return true;
    } else {
      // It's a miss
      missedAtks.push([row, col]);
      return false;
    }
  };

  const allSunk = (ship1, ship2, ship3, ship4, ship5) => {
    const ships = [ship1, ship2, ship3, ship4, ship5];
    return ships.every((ship) => ship.isSunk());
  };

  return {
    gameboard,
    placeShip,
    receiveAttack,
    missedAtks,
    successfulAtks,
    attacks,
    allSunk,
  };
}

export { Gameboard };
