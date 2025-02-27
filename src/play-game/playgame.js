import { renderboard } from "./renderBoard";
import { Player } from "../players/Player";
import { Ship } from "../ships-factory/Ships";

function playgame() {
  const player = Player("player");
  const computerPlayer = Player("Computer");

  // Ships
  const carrier = Ship(5);
  const battleship = Ship(4);
  const destroyer = Ship(3);
  const submarine = Ship(3);
  const patrolBoat = Ship(2);

  //   Placing ships of player and the computer
  player.Gameboard.placeShip(carrier, 0, 0);
  player.Gameboard.placeShip(battleship, 3, 5);
  player.Gameboard.placeShip(destroyer, 5, 5);
  player.Gameboard.placeShip(submarine, 4, 1);
  player.Gameboard.placeShip(patrolBoat, 7, 1);

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
  const playerBoard = renderboard(player);
  playerBoard.classList.add("player-board");
  const computerBoard = renderboard(computerPlayer);
  computerBoard.classList.add("computer-board");

  // Appending the boards to the container
  boardsContainer.append(playerBoard, computerBoard);

  const playerInfoContainer = document.createElement("div");
  playerInfoContainer.classList.add("player-name-container");

  const playerName = document.createElement("div");
  playerName.textContent = `${player.playerName}`;
  playerName.classList.add("player-name");

  const computerName = document.createElement("div");
  computerName.textContent = `${computerPlayer.playerName}`;
  computerName.classList.add("computer-name");

  playerInfoContainer.append(playerName, computerName);

  let gameOver = false;
  let activePlayer = player;

  const switchPlayers = () => {
    if (activePlayer === player) {
      activePlayer = computerPlayer;
      enableBoard(playerBoard);
      disableBoard(computerBoard);
    } else {
      activePlayer = player;
      enableBoard(computerBoard);
      disableBoard(playerBoard);
    }

    console.log("Current player: ", activePlayer)
  };

  const enableBoard = (board) => {
    const cols = board.querySelectorAll(".cols");
    cols.forEach((col) => {
      col.addEventListener("click", attack);
    });
  };

  const disableBoard = (board) => {
    const cols = board.querySelectorAll(".cols");
    cols.forEach((col) => {
      col.removeEventListener("click", attack);
    });
  };

  const attack = (e) => {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;

    const colVal = [row, col];
    console.log(colVal);
    activePlayer.Gameboard.receiveAttack(colVal[0], colVal[1]);
    switchPlayers();
  };

  enableBoard(computerBoard);
  disableBoard(playerBoard);
  mainContainer.append(newGameDiv, boardsContainer, playerInfoContainer);
}

export { playgame };
