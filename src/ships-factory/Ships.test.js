const Ship = require("./Ships");

test("Creating Ship", () => {
  const ship = Ship(5);
  expect(ship.length).toBe(5);
  expect(typeof ship.hit).toBe("function");
  expect(typeof ship.isSunk).toBe("function");
});

test("increase hit count", () => {
  const ship = Ship(5);
  ship.hit();
  expect(ship.getHits()).toBe(1);
});


test("Checking if a ship sunk", () => {
  const ship = Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true)
})