'use strict';

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

function build_key_count_map(array){
  return array.reduce((acc, value) => {
    if ( acc[value] !== undefined ) {
      acc[value] += 1;
    }
    else {
      acc[value] = 1;
    }
    return acc;
  }, {});
}
// Complete the checkMagazine function below.
function checkMagazine(magazine, note) {
  const m = magazine.reduce((acc, value) => {
    if ( acc[value] !== undefined ) {
      acc[value] += 1;
    }
    else {
      acc[value] = 1;
    }
    return acc;
  }, {});
  
  let has_all = note.reduce((acc, curr) => {
    if (m[curr] !== undefined && m[curr] > 0) {
      m[curr] -= 1;
      return acc && true;
    }
    else {
      return acc && false;
    }
  }, true);

  if (has_all) {
    console.log('Yes');
  }
  else {
    console.log('No');
  }

}

function main() {
  const mn = readLine().split(' ');

  const m = parseInt(mn[0], 10);

  const n = parseInt(mn[1], 10);

  const magazine = readLine().split(' ');

  const note = readLine().split(' ');

  checkMagazine(magazine, note);
}
