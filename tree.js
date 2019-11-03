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
  inputString = inputString.trim().split('\n').map(str => str.trim());

  main();
});

function readLine() {
  return inputString[currentLine++];
}
class Node {
  constructor(value, left = new Empty_Node(), right = new Empty_Node()) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.visited = false;
  }
}
class Empty_Node extends Node {
  constructor() {
    super(-1, -1, -1);
  }
}
function is_leaf(root) {
  return root.left.value == -1 && root.right.value == -1;
}
function traverse(root, result = [], parent_stack = []) {
  if (is_leaf(root)) {
    root.visited = true;
    result.push(root.value);
    return result;
  }
  if (root.value == -1) {
    root.visited = true;
    let parent = parent_stack.pop();
    return result;
  }
  if (!root.visited) {
    parent_stack.push(root);
  }
  traverse(root.left, result, parent_stack)
  result.push(root.value)
  traverse(root.right, result, parent_stack)
  return result;
}

function traverse_2(root, result = []) {
  if (root == undefined || root.value == -1){
    return;
  }
  traverse_2(root.left, result)
  result.push(root.value)
  traverse_2(root.right, result)
  return result;
}

function create_tree(root, indexes, index = 0) {
  let left_index = indexes[index][0];
  let right_index = indexes[index][1];

  if (left_index != -1) {
    let left_node = new Node(left_index);
    left_node = create_tree(left_node, indexes, left_index - 1);
    root.left = left_node;
  }

  if (right_index != -1) {
    let right_node = new Node(right_index);
    right_node = create_tree(right_node, indexes, right_index - 1);
    root.right = right_node;
  }

  return root;
}

function foo(root, swap_level, curr_level = 1) {
  if (root == undefined || root == -1 || root.value == -1)  {
    return root;
  }
  if (curr_level % swap_level == 0) {
    const tmp = root.left;
    root.left = root.right;
    root.right = tmp;
  }
  const next_level = curr_level + 1;
  foo(root.left, swap_level, next_level)
  foo(root.right, swap_level, next_level)
  return root;
}

/*
 * Complete the swapNodes function below.
 */
function swapNodes(indexes, queries) {
  /*
   * Write your code here.
   */
  console.log(indexes)
  console.log(queries)
  const root = create_tree(new Node(1), indexes);
  // let path = traverse(root).join(' ');
  // console.log(path);
  queries.forEach((swap_level) => {
    foo(root, swap_level);
    let path = traverse_2(root).join(' ');
    console.log(path);
  })
  // console.log(JSON.stringify(root, null, 2));
}
const indexes = [[2, 3],
[4, -1],
[5, -1],
[6, -1],
[7, 8],
[-1, 9],
[-1, -1],
[10, 11],
[-1, -1],
[-1, -1],
[-1, -1]];
// const indexes = [ [ 2, 3 ], [ -1, -1 ], [ -1, -1 ] ];
// const queries = [1, 1];
const queries = [2, 4];
swapNodes(indexes, queries)

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine(), 10);

  let indexes = Array(n);

  for (let indexesRowItr = 0; indexesRowItr < n; indexesRowItr++) {
    indexes[indexesRowItr] = readLine().split(' ').map(indexesTemp => parseInt(indexesTemp, 10));
  }

  const queriesCount = parseInt(readLine(), 10);

  let queries = [];

  for (let queriesItr = 0; queriesItr < queriesCount; queriesItr++) {
    const queriesItem = parseInt(readLine(), 10);
    queries.push(queriesItem);
  }

  let result = swapNodes(indexes, queries);

  ws.write(result.map(x => x.join(' ')).join("\n") + "\n");

  ws.end();
}
