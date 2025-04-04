import { playgame } from "../play-game";

const mainContainer = document.getElementById("main-container");
mainContainer.classList.add("start-game-container");

const battleShipHeading = document.createElement("p");
battleShipHeading.classList.add("battleship-heading");
battleShipHeading.textContent = "Battleship game!";

// Instruction of the game
const battleShipIntro = document.createElement("p");
battleShipIntro.classList.add("battleship-intro");
battleShipIntro.textContent = "The board will be randomized!";

// Start game button
const startGameBtn = document.createElement("button");
startGameBtn.classList.add("start-game-btn");
startGameBtn.textContent = "Start game";

startGameBtn.addEventListener("click", () => {
  mainContainer.classList.remove("start-game-container")
  playgame();
});

mainContainer.append(battleShipHeading, battleShipIntro, startGameBtn);
