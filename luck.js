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
function sum(acc, val) {
  acc += val;
  return acc;
}
// Complete the luckBalance function below.
function luckBalance(k, contests) {
  let m = {};
  m[0] = new Array();
  m[1] = new Array();
  m = contests.reduce((acc, contest) => {
    const luck = contest[0];
    const x = contest[1];
    acc[x].push(luck);
    return acc;
  }, m);
  m[0] = m[0].sort((a, b) => a - b);
  m[1] = m[1].sort((a, b) => a - b);
  const imp = m[1];
  const imp_len = imp.length;
  const n_imp = m[0];
  const n_imp_len = n_imp.length;
  let luck = 0;
  if (imp_len >= k) {
    luck -= imp.slice(0, imp_len - k).reduce(sum, 0);
    luck += n_imp.reduce(sum, 0);
    luck += imp.slice(imp_len - k).reduce(sum,0);
  } else {
    luck -= imp.reduce(sum, 0);
    luck -= n_imp.slice(0, n_imp_len - (imp_len - k)).reduce(sum, 0);
    luck += n_imp.slice(n_imp_len - (imp_len - k)).reduce(sum,0);
  }
  return luck;

}

const contest = [
  [5, 1],
  [2, 1],
  [1, 1],
  [8, 1],
  [10, 0],
  [5, 0]
];
luckBalance(3, contest);

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
