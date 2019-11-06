class Tree {
  constructor(data) {
    if (data > 1) {
      console.log('wtf');
    }
    this.data = data;
    this.left = undefined;
    this.right = undefined;
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
  _create_buff(size) {
    let buff = '';
    let tmp_size = size;
    while (tmp_size > 0) {
      buff += '\t';
      tmp_size -= 1;
    }
    return buff;
  }
  _printBFS(startNode, level) {
    if (startNode === undefined || startNode === null) {
      return;
    }
    this._printBFS(startNode.right, level + 1);
    console.log(this._create_buff(level) + startNode.data + ' ' + startNode.is_leaf());
    this._printBFS(startNode.left, level + 1);
  }


}

module.exports = { Tree };