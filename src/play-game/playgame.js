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
  console.log(player.Gameboard.placeShip(carrier));
  console.log(player.Gameboard.placeShip(battleship));
  console.log(player.Gameboard.placeShip(destroyer));
  console.log(player.Gameboard.placeShip(submarine));
  console.log(player.Gameboard.placeShip(patrolBoat));

  //   Computer
  console.log(computerPlayer.Gameboard.placeShip(carrier));
  console.log(computerPlayer.Gameboard.placeShip(battleship));
  console.log(computerPlayer.Gameboard.placeShip(destroyer));
  console.log(computerPlayer.Gameboard.placeShip(submarine));
  console.log(computerPlayer.Gameboard.placeShip(patrolBoat));

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

  const checkWinner = (result) => {
    if (result) {
      gameOver = true;
      alert(`${activePlayer.playerName} wins!`);
      disableBoard(playerBoard);
      disableBoard(computerBoard);
      return true;
    }

    return false;
  };
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

  const attack = () => {
    if (gameOver) return;
    if (activePlayer === player) {
      // Attacking the computer board!
      const row = parseInt(event.target.dataset.row);
      const col = parseInt(event.target.dataset.col);

      // Coordinates for the player
      const coordinatesPlayer = [row, col];
      console.log(coordinatesPlayer);
      if (
        activePlayer.Gameboard.attacks.some(
          (coords) => coords[0] === row && coords[1] === col
        )
      ) {
        alert("Please select a different coordinate!");
        return;
      }

      const atkResult = computerPlayer.Gameboard.receiveAttack(
        coordinatesPlayer[0],
        coordinatesPlayer[1]
      );

      if (atkResult) {
        console.log("Player hit the ship!");
        event.target.style.backgroundColor = "red";
        activePlayer.Gameboard.successfulAtks.push(coordinatesPlayer);
      } else {
        console.log("Player's attack missed!");
        event.target.style.backgroundColor = "gray";
        activePlayer.Gameboard.missedAtks.push(coordinatesPlayer);
      }

      activePlayer.Gameboard.attacks.push(coordinatesPlayer);
    }

    const allShipSunkOfComputer = computerPlayer.Gameboard.allSunk(
      carrier,
      battleship,
      destroyer,
      submarine,
      patrolBoat
    );

    console.log("All ships sunk of computer: ", allShipSunkOfComputer)
    if (checkWinner(allShipSunkOfComputer)) {
      return;
    }

    switchPlayers();
    console.log("Current player: ", activePlayer);
    if (activePlayer === computerPlayer) {
      console.log("Computer's turn");

      const generateCoords = () => {
        const num = Math.floor(Math.random() * 10);
        return num;
      };

      let computerRow = generateCoords();
      let computercol = generateCoords();

      const computercoords = [computerRow, computercol];
      activePlayer.Gameboard.attacks.push(computercoords);
      do {
        computerRow = generateCoords();
        computercol = generateCoords();
      } while (
        activePlayer.Gameboard.attacks.some(
          (coords) => coords[0] === computerRow && coords[1] === computercol
        )
      );

      // Computer Cell to handle DOM updation
      const computerCell = document.querySelector(
        `.player-board .cols[data-row = "${computercoords[0]}"][data-col = "${computercoords[1]}"]`
      );

      const atkResult = player.Gameboard.receiveAttack(
        computercoords[0],
        computercoords[1]
      );

      if (atkResult) {
        computerCell.style.backgroundColor = "red";
        activePlayer.Gameboard.successfulAtks.push(computercoords);
      } else {
        computerCell.style.backgroundColor = "gray";
        activePlayer.Gameboard.missedAtks.push(computercoords);
      }
      console.log("Computer hit:", computercoords);

      const allShipSunkOfPlayer = player.Gameboard.allSunk(
        carrier,
        battleship,
        destroyer,
        submarine,
        patrolBoat
      );

      console.log("All ships sunk of player: ", allShipSunkOfPlayer);

      if (checkWinner(allShipSunkOfPlayer)) {
        return;
      }
      console.log(gameOver);
      switchPlayers();
      console.log("back to: ", activePlayer);
    }
  };
  console.log("Player's turn!");
  // Initaial render
  enableBoard(computerBoard);
  disableBoard(playerBoard);
  mainContainer.append(newGameDiv, boardsContainer, playerInfoContainer);
}

export { playgame };
