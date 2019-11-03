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

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {
  const x = arr.map((value, index) => {
    return { value, index, visited: false };
  });
  let count = 0;
  let old_count = 0;
  x.forEach((item, index) => {
    let new_item = item;
    // console.log(JSON.stringify(new_item, null, 2));
    // console.log("-------------------------------");
    while (!new_item.visited) {

      new_item.visited = true;
      const new_index = new_item.value - 1;
      new_item = x[new_index];
      if (new_item.value !== new_index + 1) {
        count += 1;
      }
      // console.log(JSON.stringify(new_item, null, 2));
    }
    if (old_count != count) {
      count -= 1;
      old_count = count;
    }
    // console.log("count: " + count);
    // console.log("================================");
  });
  return count;
}

const x = minimumSwaps([1, 3, 5, 2, 4, 6, 7]);
// console.log(x);

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine(), 10);

  const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

  const res = minimumSwaps(arr);

  ws.write(res + '\n');

  ws.end();
}
