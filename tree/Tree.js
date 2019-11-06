// import Utils from '../Utils';
const { create_buff, flip_coin } = require('../Utils');

class Tree {
  constructor(data) {
    if (data > 1) {
      console.log('wtf');
    }
    this.data = data;
    this.left = undefined;
    this.right = undefined;
  }
  is_empty() {
    return this === undefined;
  }
  is_leaf() {
    const { data, left, right } = this;
    return data !== undefined && left === undefined && right == undefined;
  }
  printBFS() {
    this._printBFS(this, 0);
  }
  add(left_data, right_data) {
    if (left_data != undefined)
      this.left = new Tree(left_data);
    if (right_data != undefined)
      this.right = new Tree(right_data);
  }

  _printBFS(startNode, level) {
    if (startNode === undefined || startNode === null) {
      return;
    }
    this._printBFS(startNode.right, level + 1);
    console.log(create_buff(level) + startNode.data + ' ' + startNode.is_leaf());
    this._printBFS(startNode.left, level + 1);
  }


  build_balance_tree(levels, result = new Tree(1)) {

    if (levels === 0) {
      return result;
    }
    const new_levels = levels - 1;
    let { data } = result;
    let left = new Tree(data * 2);
    result.left = this.build_balance_tree(new_levels, left);
    let right = new Tree(data * 2 + 1);
    result.right = this.build_balance_tree(new_levels, right);
    return result;

  }

  build_random_tree(levels, result = new Tree(1)) {

    if (levels === 0) {
      return result;
    }
    const new_levels = levels - 1;
    let value = 0;
    if (flip_coin()) {
      value = flip_coin() ? 0 : 1;
      result.left = this.build_random_tree(new_levels, new Tree(value));
    }
    if (flip_coin()) {
      value = flip_coin() ? 0 : 1;
      result.right = this.build_random_tree(new_levels, new Tree(value));
    }
    return result;

  }


}

module.exports = { Tree };