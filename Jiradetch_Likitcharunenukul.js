function getMinMove(start,target,brokenTiles) {
  const board = [];
  for (let i = 0;i < 8;i++) {
    board[i] = [];
  }

  const coord = (pos) => {
    const col = pos.charCodeAt(0) - 'a'.charCodeAt(0);
    const row = 8 - parseInt(pos[1]);
    return [row,col];
  };
  const brokenset = new Set(brokenTiles.map(pos =>coord(pos).join(',')));
  const addMove = (x,y,level) => {
    if (
      x >= 0 && x <= 7 && y >= 0 &&  y <= 7 &&
      board[x][y] == null && !brokenset.has(`${x},${y}`)
    ) {
      board[x][y] = level;
    }
  };

  const addAllMoves = (x,y,level) => {
    addMove(x + 1,y + 2,level);
    addMove(x + 2,y + 1,level);
    addMove(x + 2,y - 1,level);
    addMove(x + 1,y - 2,level);
    addMove(x - 1,y - 2,level);
    addMove(x - 2,y - 1,level);
    addMove(x - 2,y + 1,level);
    addMove(x - 1,y + 2,level);
  };

  const addAllPossible = (level) => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] === level) {
          addAllMoves(i,j,level + 1);
        }
      }
    }
  };

  const [startX,startY] = coord(start);
  const [endX,endY] = coord(target);

  if (brokenset.has(`${startX},${startY}`) || brokenset.has(`${endX},${endY}`)) {
    return -1;
  }

  addMove(startX,startY,0);

  let index = 0;
  while (board[endX][endY] == null) {
    addAllPossible(index++);
    if (index > 64)return -1;
  }

  return board[endX][endY];
}

console.log(getMinMove("d6","h8",["f6","f7"])); 
console.log(getMinMove("a1","b3",[]));           
console.log(getMinMove("a1","h8",[]));           
console.log(getMinMove("a1","a1",[]));           
console.log(getMinMove("a1","b3",["b3"]));       