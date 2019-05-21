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

// Complete the arrayManipulation function below.
function arrayManipulation(n, queries) {
  let x = new Array(n).fill(0);
  let max = 0;
  queries.forEach((abk, index_query) => {
    let [a, b, k] = abk;
    a -= 1
    x.slice(a,b)
      .map((value => value += k))
      .forEach((value,index) => {
        x[a+index] = value;
        if (value > max) {
          max = value;
          console.log(max, index_query);
        }
      })
  })
  return max;
}


// let queries = [
// [2,6,8],
// [3,5,7],
// [1,8,1],
// [5,9,15],
// ]

// queries = "1 2 100\n\
// 2 5 100\n\
// 3 4 100".split('\n').map(value => value.split(' ').map(queriesTemp => parseInt(queriesTemp, 10)));
// arrayManipulation(10, queries)



function main() {
  const ws = fs.createWriteStream("./out.txt");

  const nm = readLine().split(' ');

  const n = parseInt(nm[0], 10);

  const m = parseInt(nm[1], 10);

  let queries = Array(m);

  for (let i = 0; i < m; i++) {
    queries[i] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
  }

  let result = arrayManipulation(n, queries);

  ws.write(result + "\n");

  ws.end();
}
