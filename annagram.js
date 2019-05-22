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

function intersection(a, b) {
  return new Set([...a].filter(x => b.has(x)));
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

sherlockAndAnagrams("ifailuhkqq")
// Complete the sherlockAndAnagrams function below.
function sherlockAndAnagrams(s) {
  

  for(let i = 1; i<s.length; i++){
    const z = s.split("").reverse().join("");

    const s_x = breakup_n(s, i)
    const z_x = breakup_n(z, i)
  
    const s_y = build_key_count_map(s_x);
    const z_y = build_key_count_map(z_x);
    console.log(z_y);
  }

}



function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s = readLine();

    let result = sherlockAndAnagrams(s);

    ws.write(result + "\n");
  }

  ws.end();
}
