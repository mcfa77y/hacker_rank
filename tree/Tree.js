const { Node } = require('./Node');

class Tree {
  constructor(data) {
    this.root = new Node(data);
  }
  is_empty() {
    return this.root === undefined;
  }
  is_leaf() {
    const {data, left, right} = this.root;
    return data !== undefined && left === undefined && right == undefined;
  }

  printBFS(startNode = this.root) {
    if (this.is_empty()){
      return;
    }
    this.printBFS(startNode.left);
    console.log(startNode.data);
    this.printBFS(startNode.right);
  }


}

module.exports = { Tree };