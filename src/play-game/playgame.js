import { renderboard } from "./renderBoard";
import { Player } from "../players/Player";
import { Ship } from "../ships-factory/Ships";

function playgame() {
  const firstPlayer = Player("player");
  const computerPlayer = Player("Computer");

  // Ships
  const carrier = Ship(5);
  const battleship = Ship(4);
  const destroyer = Ship(3);
  const submarine = Ship(3);
  const patrolBoat = Ship(2);

  //   Placing ships of player and the computer
  firstPlayer.Gameboard.placeShip(carrier, 0, 0);
  firstPlayer.Gameboard.placeShip(battleship, 3, 5);
  firstPlayer.Gameboard.placeShip(destroyer, 5, 5);
  firstPlayer.Gameboard.placeShip(submarine, 4, 1);
  firstPlayer.Gameboard.placeShip(patrolBoat, 7, 1);

  //   Computer
  computerPlayer.Gameboard.placeShip(carrier, 2, 0);
  computerPlayer.Gameboard.placeShip(battleship, 3, 1);
  computerPlayer.Gameboard.placeShip(destroyer, 5, 1);
  computerPlayer.Gameboard.placeShip(submarine, 4, 5);
  computerPlayer.Gameboard.placeShip(patrolBoat, 7, 6);

  const mainContainer = document.getElementById("main-container");
  mainContainer.classList.add("main-game");
  mainContainer.innerHTML = "";

  const newGameDiv = document.createElement("div");
  newGameDiv.classList.add("new-game-div");

  const newGamep = document.createElement("p");
  newGamep.classList.add("new-game-p");
  newGamep.textContent =
    "Didn't like the board? Click the button below to create a new one!";

  const newGameBtn = document.createElement("button");
  newGameBtn.classList.add("new-game-btn");
  newGameBtn.textContent = "Create new game";

  newGameBtn.addEventListener("click", () => {
    console.log("new game was created!");
    playgame();
  });

  newGameDiv.append(newGamep, newGameBtn);

  // Boards container divs
  const boardsContainer = document.createElement("div");
  boardsContainer.classList.add("boards-container-div");

  // Creating two boards to store the gameboards for each player.
  const playerBoard = renderboard(firstPlayer);
  playerBoard.classList.add("player-board");
  const computerBoard = renderboard(computerPlayer);
  computerBoard.classList.add("computer-board");

  // Appending the boards to the container
  boardsContainer.append(playerBoard, computerBoard);

  const playerInfoContainer = document.createElement("div");
  playerInfoContainer.classList.add("player-name-container");

  const playerName = document.createElement("div");
  playerName.textContent = `${firstPlayer.playerName}`;
  playerName.classList.add("player-name");

  const computerName = document.createElement("div");
  computerName.textContent = `${computerPlayer.playerName}`;
  computerName.classList.add("computer-name");

  playerInfoContainer.append(playerName, computerName);

  // Variables to handle the winner and handling the currentPlayer
  let winner = false;
  let currentPlayer = firstPlayer;

  // Switchting between players
  const switchPlayers = () => {
    if (currentPlayer === firstPlayer) {
      currentPlayer = computerPlayer;
    } else {
      currentPlayer = firstPlayer;
    }
  };

  const handleClick = (e) => {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;

    const colVal = [row, col];
    console.log(colVal);
    switchPlayers();
    return colVal;
  };

  const enableBoard = (board) => {
    const cols = board.querySelectorAll(".cols");
    cols.forEach((col) => {
      col.addEventListener("click", handleClick);
    });
  };

  const disableBoard = (board) => {
    const cols = board.querySelectorAll(".cols");
    cols.forEach((col) => {
      col.removeEventListener("click", handleClick);
    });
  };

  if (currentPlayer === firstPlayer) {
    enableBoard(computerBoard);
    disableBoard(playerBoard);
  } else {
    enableBoard(playerBoard);
    disableBoard(computerBoard);
  }

  mainContainer.append(newGameDiv, boardsContainer, playerInfoContainer);
}

export { playgame };
