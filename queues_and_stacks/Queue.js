const {Node} = require('./Node');
// FIFO
class Queue {

  constructor(data) {
    this.head = new Node(data);
    this.tail = this.head;
  }

  push(data) {
    const s = new Node(data);
    if (this.head.next == undefined) {
      this.head.next = s;
    }
    this.tail.next = s;
    this.tail = s;
  }

  is_empty() {
    return this.head == undefined;
  }

  pop() {
    if (this.is_empty()) {
      throw 'Empty Queue';
    }
    const result = this.head.data;
    this.head = this.head.next;
    return result;
  }

  peek() {
    if (this.is_empty()) {
      throw 'Empty Queue';
    }
    return this.head.data;
  }
}

module.exports = { Queue };