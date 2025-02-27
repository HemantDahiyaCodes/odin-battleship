function Ship(length) {
  let hits = 0;
  let sunk = false;

  const hit = () => {
    hits += 1;
  };

  const isSunk = () => {
    if (hits === length) {
      sunk = true;
      return sunk;
    }
  };

  const getHits = () => {
    return hits;
  }

  return { length, hit, isSunk, getHits };
}


export {Ship};