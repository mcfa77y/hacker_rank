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
function compare(a, b) { return a - b; }
function zip_index(acc, val, index, arr) {
  acc[val] = index + 1;
  return acc;
}

function get_index_lte(map, val) {
  let tmp_val = val;
  let index = undefined
  while (index == undefined && tmp_val > 0) {
    index = map[tmp_val]
    tmp_val -= 1
  }
  return index;

}
function binary_search_closest(arr, val, a = 0, b = arr.length - 1) {
  if (val < arr[a]) {
    return undefined;
  }
  if (val >= arr[b] || a == b) {
    return b;
  }
  const isFoo =  ((b - a) >>> 1)) === 0;
  if (val === arr[a] || isFoo) {
    return a;
  }

  const mid = ((b - a) >>> 1) + a;
  console.log(arr, mid)
  console.log(arr[a], arr[mid], arr[b])
  console.log(val)
  if (arr[mid] == val) {
    return mid;
  }
  if (val < arr[mid]) {
    return binary_search_closest(arr, val, a, mid);
  }
  else {
    return binary_search_closest(arr, val, mid, b);
  }
}
// Complete the triplets function below.
function triplets(a, b, c) {
  // const p_map = [...new Set(a)].sort(compare).reduce(zip_index, {});
  const p_arr = [...new Set(a)].sort(compare);
  const q_arr = [...new Set(b)].sort(compare);
  const r_arr = [...new Set(c)].sort(compare);
  // const r_map = [...new Set(c)].sort(compare).reduce(zip_index, {});

  const result = q_arr.reduce((acc, q) => {
    // let p_index = get_index_lte(p_map, q);
    // let r_index = get_index_lte(r_map, q);
    let p_index = binary_search_closest(p_arr, q);
    let r_index = binary_search_closest(r_arr, q);

    // acc += p_arr.filter(p => p <= q).length * r_arr.filter(r => r <= q).length;
    if (p_index != undefined && r_index != undefined) {
      acc += (p_index + 1) * (r_index + 1);
    }
    return acc;
  }, 0)
  return result;
}
// const a = [1, 3, 5, 7];
// const b = [5, 7, 9];
// const c = [7, 9, 11, 13];

const a = [1, 4, 5];
const b = [2, 3, 3];
const c = [1, 2, 3];
triplets(a, b, c);

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const lenaLenbLenc = readLine().split(' ');

  const lena = parseInt(lenaLenbLenc[0], 10);

  const lenb = parseInt(lenaLenbLenc[1], 10);

  const lenc = parseInt(lenaLenbLenc[2], 10);

  const arra = readLine().split(' ').map(arraTemp => parseInt(arraTemp, 10));

  const arrb = readLine().split(' ').map(arrbTemp => parseInt(arrbTemp, 10));

  const arrc = readLine().split(' ').map(arrcTemp => parseInt(arrcTemp, 10));

  const ans = triplets(arra, arrb, arrc);

  ws.write(ans + '\n');

  ws.end();
}
