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

function breakup_n(s, n) {
  let result = [];
  for (let i = 0; (i + n - 1) < s.length; i++) {
    result.push(s.substring(i, i + n));
  }
  return result;
}


function build_key_count_map(array) {
  return array.reduce((acc, value) => {
    const sorted_value = value.split('').sort().join('');
    if (acc[sorted_value] !== undefined) {
      acc[sorted_value] += 1;
    }
    else {
      acc[sorted_value] = 1;
    }
    return acc;
  }, {});
}

let f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
} 

function choose(n, r){
  return factorial(n) / ( factorial(r) * factorial(n - r));
}

console.log(sherlockAndAnagrams('abba'));
// Complete the sherlockAndAnagrams function below.
function sherlockAndAnagrams(s) {
  let result = 0;

  for(let i = 1; i<s.length; i++){
    const s_x = breakup_n(s, i);
    const s_y = build_key_count_map(s_x);
    result += Object.entries(s_y).reduce((acc, [key, value]) => {
      if(value>1)
        acc += choose(value, 2);
      return acc;
    }, 0);
    
  }
  return result;
}



function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s = readLine();

    let result = sherlockAndAnagrams(s);

    ws.write(result + '\n');
  }

  ws.end();
}
