'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}


function build_key_count_map(array) {
  return array.reduce((acc, value) => {
    if (acc[value] !== undefined) {
      acc[value] += 1
    }
    else {
      acc[value] = 1
    }
    return acc;
  }, {})
}
function get_triplets(n, r) {
  return [r ** n, r ** (n + 1), r ** (n + 2)]
}

// Complete the countTriplets function below.
function countTriplets(arr, r) {
  const count_map = build_key_count_map(arr);
  const unique_arr = Object.keys(count_map).map(x => parseInt(x, 10)).sort();
  console.log(JSON.stringify(count_map, null, 2));
  let result = 0;
  unique_arr.reduce((acc, value, index) => {
    const triples = get_triplets(index, r);
    const has_all_triplets = triples.every((value) => count_map[value] != undefined);
    if (has_all_triplets) {
      console.log(triples);
      result += triples.reduce((acc, value) => {
        acc *= count_map[value];
        return acc;
      }, 1)
      console.log(result);
    }
  }, 0)
  return result;
}

countTriplets("1 2 1 2 4".split(' '), 2);

function main() {
  const ws = fs.createWriteStream('out.txt');

  const nr = readLine().replace(/\s+$/g, '').split(' ');

  const n = parseInt(nr[0], 10);

  const r = parseInt(nr[1], 10);

  const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

  const ans = countTriplets(arr, r);

  ws.write(ans + '\n');

  ws.end();
}
