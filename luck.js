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
    luck -= n_imp.slice(0, (k - imp_len)).reduce(sum, 0);
    luck += n_imp.slice((k - imp_len)).reduce(sum,0);
  }
  return luck;

}

const contest = [[105, 0], [103, 0], [106, 1], [106, 1], [103, 0], [103, 1], [105, 1], [106, 1], [105, 0], [104, 0], [103, 0], [102, 0], [104, 0], [105, 0], [104, 0], [102, 1], [104, 0], [106, 1], [104, 1], [101, 1], [105, 0], [103, 0], [104, 0], [106, 0], [102, 1], [103, 0], [102, 0], [103, 1], [106, 0], [104, 1], [101, 1], [101, 1], [106, 0], [103, 1], [103, 0], [104, 1], [101, 0], [105, 1], [105, 0], [104, 1], [105, 0], [106, 0], [104, 0], [105, 0], [101, 1], [106, 1], [105, 0], [103, 0], [104, 1], [101, 1], [106, 1], [104, 0], [106, 1], [105, 0], [103, 1], [101, 0], [103, 0], [101, 0], [105, 1], [104, 1], [104, 1], [105, 1], [105, 1], [103, 0], [101, 0], [104, 1], [106, 1], [105, 1], [105, 0], [106, 1], [104, 1], [105, 1], [103, 1], [102, 1], [106, 0], [101, 0], [105, 1], [104, 1], [103, 1], [106, 1], [101, 0], [106, 1], [103, 0], [106, 1], [102, 1], [103, 0], [101, 1], [102, 1], [101, 1], [104, 0], [106, 0], [102, 0], [104, 0], [105, 0], [105, 0], [102, 1], [103, 1]];
luckBalance(58, contest);

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
