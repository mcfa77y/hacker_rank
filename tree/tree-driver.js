const { Tree } = require('./Tree');

function build_balance_tree(levels, result = new Tree(1)) {

  if (levels === 0) {
    return result;
  }
  const new_levels = levels - 1;
  let { data } = result;
  let left = new Tree(data * 2);
  result.left = build_balance_tree(new_levels, left);
  let right = new Tree(data * 2 + 1);
  result.right = build_balance_tree(new_levels, right);
  return result;

}
function flip_coin(prob = 0.5) {
  return Math.random() > prob;
}
function build_random_tree(levels, result = new Tree(1)) {

  if (levels === 0) {
    return result;
  }
  const new_levels = levels - 1;
  let value = 0;
  if (flip_coin()) {
    value = flip_coin() ? 0 : 1;
    result.left = build_random_tree(new_levels, new Tree(value));
  }
  if (flip_coin()) {
    value = flip_coin() ? 0 : 1;
    result.right = build_random_tree(new_levels, new Tree(value));
  }
  return result;

}

// const t = build_random_tree(3);


function should_prune(t= new Tree(1)){
  if (t == undefined){
    return true;
  }
  if (t.is_leaf() && t.data == 0){
    return true;
  }
  if (t.data == 1){
    return false;
  }
  return should_prune(t.left) && should_prune(t.right);
}

function prune(t){
  if (t == undefined){
    return;
  }
  if (should_prune(t.left)){
    t.left = undefined;
  }
  else {
    prune(t.left);
  }
  if (should_prune(t.right)){
    t.right = undefined;
  }
  else {
    prune(t.right);
  }
}
/*
   0
  / \
 1   0
    / \
   1   0
  / \
 0   0
*/
// t.printBFS();
const t = new Tree(1);
t.add(1,0);
t.right.add(1,0);
t.right.left.add(0,0);
t.printBFS();
prune(t);
console.log("\n\n");

t.printBFS();