'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString.replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the largestRectangle function below.
function largestRectangle(h) {

  let stack = [];
  let mx = -1;
  stack.push(0);
  for (let i = 1; i < h.length; i++) {
    let last_index = stack.slice(-1)[0];
    let stack_h = h[last_index];
    let curr_h = h[i];
    if (curr_h > stack_h || stack.length == 0) {
      stack.push(i);
    }
    else {
      let anchor = i;
      while (curr_h <= stack_h && stack.length > 0) {
        last_index = stack.pop();
        let area = stack_h * (anchor - last_index);
        mx = Math.max(area, mx);
        stack_h = h[last_index];
      }
    }
  }

  let anchor = h.length;
  let curr_h = h[h.length - 1];
  let stack_h = h[stack.slice(-1)[0]];
  while (curr_h >= stack_h && stack.length > 0) {
    let last_index = stack.pop();
    stack_h = h[last_index];
    let area = stack_h * (anchor - last_index);
    mx = Math.max(area, mx);

  }

  return mx;
}
largestRectangle([3, 2, 3]);
// function main() {
//     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

//     const n = parseInt(readLine(), 10);

//     const h = readLine().split(' ').map(hTemp => parseInt(hTemp, 10));

//     let result = largestRectangle(h);

//     ws.write(result + "\n");

//     ws.end();
// }
