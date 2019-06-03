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

// Complete the hourglassSum function below.
function hourglassSum(arr) {
  const max_size = 5;
  let max = -Infinity;
  for (let i = 0; i < max_size - 1; i++) {
    for (let j = 0; j < max_size - 1; j++) {

      let result = 0;
      result += arr[i][j];
      result += arr[i][j + 1];
      result += arr[i][j + 2];

      result += arr[i + 1][j + 1];

      result += arr[i + 2][j];
      result += arr[i + 2][j + 1];
      result += arr[i + 2][j + 2];

      if (result > max) {
        max = result;
        console.log('new max');
      }
      console.log(i, j, result,  arr[i][j]);
    }
  }
  return max;
}
const arr = [[1, 1, 1, 0, 0, 0], [0, 1, 0, 0, 0, 0], [1, 1, 1, 0, 0, 0], [0, 0, 2, 4, 4, 0], [0, 0, 0, 2, 0, 0], [0, 0, 1, 2, 4, 0]];
hourglassSum(arr);

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  let arr = Array(6);

  for (let i = 0; i < 6; i++) {
    arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
  }

  let result = hourglassSum(arr);

  ws.write(result + '\n');

  ws.end();
}
