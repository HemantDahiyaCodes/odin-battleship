import {Gameboard} from "../gameboard-factory/gameboardFactory";

function Player(playerName) {
  return { playerName, Gameboard: Gameboard() };
}
export {Player};