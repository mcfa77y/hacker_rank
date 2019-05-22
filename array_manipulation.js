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

function update(diff_array, [a, b, k]) {
    diff_array[a - 1] += k;
    diff_array[b] -= k;
}
function get_max(array, diff_array) {
    let result = array;
    let max = 0;
    let foo = array.map((value, index) => {
        if (index === 0) {
            result[index] = diff_array[0]
            return diff_array[0]
        }
        result[index] = diff_array[index] + result[index - 1]
        return result[index]
    })
    console.log(foo);
    foo.forEach((value, index) => {
      if (value > max) {
          max = value;
      }
  })
    return max;
}
// Complete the arrayManipulation function below.
function arrayManipulation(n, queries) {
    let array = new Array(n).fill(0);
    let diff_array = new Array(n + 1).fill(0);
    queries.forEach((query, index) => {
        update(diff_array, query)
    })
    return get_max(array, diff_array);
}
// const queries = [[1,2,100],[2,5,100],[3,4,100]];
const queries = [[2,3,603],
[1,1,286],
[4,4,882]];
arrayManipulation(4, queries);

function main() {
    const ws = fs.createWriteStream("out.txt");

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
