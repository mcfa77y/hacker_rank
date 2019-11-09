'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}
/*
0,0 1,0
0,1 1,1
0,2 1,2


*/
class Point {
  constructor(col, row) {
    this.row = row;
    this.col = col;
  }
  equals(other_pt) {
    return other_pt.row === this.row && other_pt.col === this.col;
  }
  update(drow, dcol) {
    this.row += drow;
    this.col += dcol;
  }
  clone() {
    return new Point(this.col, this.row);
  }
}

class Game {
  constructor(grid, goal_pt) {
    this.grid = grid;
    this.goal_pt = goal_pt;
    this.size = grid[0].length - 1;
    this.visited = [];
    
    let col_vals = [];
    for (let col = 0; col < this.size + 1; col += 1){
      col_vals.push(false);
    }
    for (let row = 0; row < this.size + 1; row += 1){
      this.visited.push(col_vals);
    }
  }
  get_symbol(pt) {
    return this.grid[pt.row][pt.col];
  }
  is_goal(pt) {
    return this.goal_pt.equals(pt);
  }
  is_passable(pt) {
    let result = false;
    if (pt.row > this.size || pt.col > this.size || pt.row < 0 || pt.col < 0) {
      result = false;
    }
    else if (this.get_symbol(pt) == '.') {
      result = true;
    }
    return result;
  }
  move(direction, start_pt) {
    if (this.is_goal(start_pt)) {
      return { start_pt, success: true };
    }
    let drow = 0;
    let dcol = 0;
    switch (direction) {
    case 'N': drow = 1; break;
    case 'S': drow = -1; break;
    case 'E': dcol = 1; break;
    case 'W': dcol = -1; break;
    }

    let result = { pt: start_pt, success: false};
    while (this.is_passable(start_pt)) {
      result.pt = start_pt.clone();
      start_pt.update(drow, dcol);
      
      if (this.is_goal(start_pt)) {
        result = { pt: start_pt, success: true };
        return result;
      }
    }
    return result;
  }
}


// Complete the minimumMoves function below.
function minimumMoves(grid, startX, startY, goalX, goalY) {
  let g = new Game(grid, new Point(goalY, goalX));
  let new_pt_list = [g.move('N', new Point(startY, startX)),
    g.move('E', new Point(startY, startX)),
    g.move('S', new Point(startY, startX)),
    g.move('W', new Point(startY, startX))];

  console.log(new_pt_list);

}

function main() {
  const ws = fs.createWriteStream('out');

  const n = parseInt(readLine(), 10);

  let grid = [];

  for (let i = 0; i < n; i++) {
    const gridItem = readLine();
    grid.push(gridItem);
  }

  const startXStartY = readLine().split(' ');

  const startX = parseInt(startXStartY[0], 10);

  const startY = parseInt(startXStartY[1], 10);

  const goalX = parseInt(startXStartY[2], 10);

  const goalY = parseInt(startXStartY[3], 10);

  const result = minimumMoves(grid, startX, startY, goalX, goalY);

  ws.write(result + '\n');

  ws.end();
}
