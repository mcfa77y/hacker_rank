'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', function() {
  inputString = inputString.replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function build_count_map(arr) {
  return arr.reduce((acc, value) => {
    if (acc[value] == undefined) {
      acc[value] = 1;
    }
    else {
      acc[value] += 1;
    }
    return acc;
  }, {});
}
// Complete the makeAnagram function below.
function makeAnagram(a, b) {
  const a_count_map = build_count_map(a.split(''));
  const b_count_map = build_count_map(b.split(''));
  const b_minus_a = {};
  let sum = 0;
  Object.keys(a_count_map).forEach((key) => {
    const a_count = a_count_map[key];
    let b_count = 0;
    if (b_count_map[key] != undefined) {
      b_count = b_count_map[key];
    }
    b_minus_a[key] = Math.abs(b_count - a_count);
    sum += Math.abs(b_count - a_count);
  });

  Object.keys(b_count_map).forEach((key) => {
    const b_count = b_count_map[key];
    let a_count = 0;
    if (a_count_map[key] != undefined) {
      a_count = b_count_map[key];
    }
    b_minus_a[key] = Math.abs(b_count - a_count);
    sum += Math.abs(b_count - a_count);
  });
    
  return sum;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const a = readLine();

  const b = readLine();

  const res = makeAnagram(a, b);

  ws.write(res + '\n');

  ws.end();
}
