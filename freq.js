'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function() {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function Count_Map() {
  const map = {};
  const freq = {};
  return {
    'insert': (value, init = 1) => {
      if (map[value] != undefined) {
        if (map[value] != 0) { freq[map[value]].delete(value); }
        map[value] += 1;
        if (freq[map[value]] != undefined) {
          freq[map[value]].add(value); 
        } else {
          freq[map[value]] = new Set();
          freq[map[value]].add(value);
        }
      }
      else {
        map[value] = init;
        freq[init] = new Set();
        freq[init].add(value);
      }

    },
    'delete': (value) => {
      if (map[value] != undefined) {
        freq[map[value]].delete(value);
        map[value] -= 1;
        if (map[value] != 0){
          freq[map[value]].add(value);
        }
      }
    },
    'frequency': (value) => {
      if (freq[value] != undefined && (freq[value].size > 0)) {
        return 1;
      }
      else {
        return 0;
      }
    },
    'print': () => {
      console.log('map', JSON.stringify(map, null, 2));
      console.log('freq', JSON.stringify(freq.toString(), null, 2));
    }
  };
}


const INSERT = 1;
const DELETE = 2;
const FREQUENCY = 3;
// Complete the freqQuery function below.
function freqQuery(queries) {

  const map = Count_Map();
  const result =  queries.reduce((acc, [query, value], index) => {
    if (query == INSERT) {
      map.insert(value, 1);
    }
    else if (query == DELETE) {
      map.delete(value);
    }
    else if (query == FREQUENCY) {
      acc.push(map.frequency(value));
      console.log('input_index', index+1, 'freq(value)', map.frequency(value), 'freq_index', acc.length);
      map.print();
    }
		
    return acc;
  }, []);
  console.log('result: ');
  // result.forEach((value, index) => console.log(index+1, value));
  return result;
}

let x = freqQuery([[1,1], [2, 1], [3,1], [1,1], [1,1], [3,2]]);
console.log(x);

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  let queries = Array(q);

  for (let i = 0; i < q; i++) {
    queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
  }

  const ans = freqQuery(queries);

  ws.write(ans.join('\n') + '\n');

  ws.end();
}
