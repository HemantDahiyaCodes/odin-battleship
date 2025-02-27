const Ship = require("../ships-factory/Ships");
const Gameboard = require("./gameboardFactory");

test("hitting a ship", () => {
  const patrolBoat = Ship(2);
  const board = Gameboard().gameboard;
  board[0][0] = patrolBoat;

  const receiveAttack = (row, col) => {
    if (board[row][col] === patrolBoat) {
      return "hit";
    } else {
      return "miss";
    }
  };

  expect(receiveAttack(0, 0)).toBe("hit");
});

test("missed attack", () => {
  const patrolBoat = Ship(2);
  const board = Gameboard().gameboard;
  const missedAtks = [];
  board[0][0] = patrolBoat;

  const receiveAttack = (row, col) => {
    if (board[row][col] === patrolBoat) {
      return "hit";
    } else {
      missedAtks.push([row, col]);
    }
  };

  receiveAttack(0, 1);

  expect(missedAtks).toContainEqual([0, 1]);
});

test("ship sank", () => {
  const patrolBoat = Ship(1);
  const board = Gameboard().gameboard;
  const missedAtks = [];
  board[0][0] = patrolBoat;

  const receiveAttack = (row, col) => {
    if (board[row][col] === patrolBoat) {
      patrolBoat.hit();
      patrolBoat.isSunk();
    } else {
      missedAtks.push([row, col]);
    }
  };

  receiveAttack(0, 0);

  expect(patrolBoat.isSunk).toBeTruthy();
});


test('Placing battleship at 0, 0', () => {
  const board = Gameboard().gameboard;
  const battleship = Ship(4);
  
  const placeShip = (ship, row, col) => {
    board[row][col] = ship;
  }

  placeShip(battleship, 0, 0);

  expect(board[0][0]).toBe(battleship)
})