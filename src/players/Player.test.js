const Gameboard = require("../gameboard-factory/gameboardFactory");
const { Player } = require("./Player");

test("Created the gameboard for player 1", () => {
    const player1 = Player();

    expect(player1).toStrictEqual({gameboard :Gameboard().gameboard})
});


test("Different gameboard for each player", () => {
    const player1 = Player();
    const player2 = Player();

    player1.gameboard[0][0] = "battleship";
    player2.gameboard[0][0] = "patrolBoat";

    const differentBoard = (first, second) => {
        if(first.gameboard[0][0] !== second.gameboard[0][0]) {
            return true;
        }
    }

    const equality = differentBoard(player1, player2);

    expect(equality).toBeTruthy();
})