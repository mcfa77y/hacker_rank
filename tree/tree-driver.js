const { Tree } = require('./Tree');

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
let t = new Tree(1);
t.add(1,0);
t.right.add(1,0);
t.right.left.add(0,0);
t.printBFS();
prune(t);
console.log('\n\n');

t.printBFS();


t = new Tree(0);