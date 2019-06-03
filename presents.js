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
// Complete the maximumToys function below.
function maximumToys(prices, k) {
  
  let filtered = prices.map(x => parseInt(x,10))
    .filter((v) => v <= k);
  console.log(filtered.length);
  let sorted =  filtered.sort(compareNumbers);
  console.log(sorted);
  let result = sorted
    .reduce((acc, v) => {
      if (acc.sum + v <= k) {
        acc.sum += v;
        acc.count += 1;
      }
      return acc;
    }, {sum: 0, count: 0}).count;    
  return result;
}

let prices = [1,12,5,111,200,1000,10];
let amt = 50;
maximumToys(prices, amt);
function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const nk = readLine().split(' ');

  const n = parseInt(nk[0], 10);

  const k = parseInt(nk[1], 10);

  const prices = readLine().split(' ').map(pricesTemp => parseInt(pricesTemp, 10));

  let result = maximumToys(prices, k);

  ws.write(result + '\n');

  ws.end();
}
