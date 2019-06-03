'use strict';

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

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// Complete the countSwaps function below.
function countSwaps(a) {
  let swapped = true;
  let swap_count = 0;
  let size = a.length;
  while (swapped) {
    swapped = false;
    for (let i = 1; i < size; i++) {
      if (a[i - 1] > a[i]) {
        swap(a, i - 1, i);
        swapped = true;
        swap_count += 1;
        console.log(a);
      }
    }
    console.log('////');
    size -= 1;
  }
  console.log(`Array is sorted in ${swap_count} swaps.`);
  console.log(`First Element: ${a[0]}`);
  console.log(`Last Element: ${a[a.length - 1]}`);

}

countSwaps('3 2 1'.split(' ').map(x => parseInt(x, 10)));
function main() {
  const n = parseInt(readLine(), 10);

  const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

  countSwaps(a);
}
