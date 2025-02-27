function renderboard(player) {
  const board = document.createElement("div");
  board.classList.add("board");

  const playerboard = player.Gameboard.gameboard;

  playerboard.forEach((rowArr, rowIndex) => {
    const row = document.createElement("div");
    row.classList.add("rows");

    rowArr.forEach((colValue, colIndex) => {
      const col = document.createElement("div");
      col.classList.add("cols");
      col.setAttribute("data-row", rowIndex);
      col.setAttribute("data-col", colIndex);
      row.append(col);
    });

    board.append(row);
  });

  return board;
}

export { renderboard };
