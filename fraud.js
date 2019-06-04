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
function compareNumbers(a, b) {
  return a - b;
}
// Complete the activityNotifications function below.
function activityNotifications(expenditure, d) {
  return expenditure.reduce((acc, value, index, arr) => {
    if (index >= d) {
      const window = arr.slice(index - d, index).sort(compareNumbers);
      // get median
      let median = 0;
      if (d % 2 != 0) {
        median = window[Math.ceil(d / 2) - 1];
      } else {
        median = (window[Math.floor(d / 2) - 1] + window[Math.floor(d / 2) + 1]) / 2;
      }
      console.log(window, median, value);
      if (value >= (median * 2)) {
        acc += 1;
      }
    }
    console.log(acc);
    return acc;
  }, 0);

}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const nd = readLine().split(' ');

  const n = parseInt(nd[0], 10);

  const d = parseInt(nd[1], 10);

  const expenditure = readLine().split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

  let result = activityNotifications(expenditure, d);

  ws.write(result + '\n');

  ws.end();
}
