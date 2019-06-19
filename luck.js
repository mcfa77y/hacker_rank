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

// Complete the luckBalance function below.
function luckBalance(k, contests) {
  let m = {};
  m[0] = new Array();
  m[1] = new Array();
  m = contests.reduce((acc, [luck, important]) => {
    acc[important] = acc[important].push(luck);
    return acc;
  }, m)
  m[0] = m[0].sort((a, b) => a - b);
  m[1] = m[1].sort((a, b) => a - b);
  const imp = m[1];
  const imp_len = imp.length;
  if (imp_len >= k) {

  }

}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const nk = readLine().split(' ');

  const n = parseInt(nk[0], 10);

  const k = parseInt(nk[1], 10);

  let contests = Array(n);

  for (let i = 0; i < n; i++) {
    contests[i] = readLine().split(' ').map(contestsTemp => parseInt(contestsTemp, 10));
  }

  const result = luckBalance(k, contests);

  ws.write(result + '\n');

  ws.end();
}
