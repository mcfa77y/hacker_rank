const { Node } = require('./Node');

class Stack {

  constructor(data) {
    this.top = new Node(data);
  }
  push(data) {
    const s = new Node(data);
    s.next = this.top;
    this.top = s;

  }

  is_empty() {
    return this.top == undefined;
  }

  pop() {
    if (this.is_empty()) {
      throw 'Empty Stack';
    }
    const result = this.top.data;
    this.top = this.to*p.next;
    return result;
  }

  peek() {
    if (this.is_empty()) {
      throw 'Empty Stack';
    }
    return this.top.data;
  }

  reverse_recusive(prev = undefined) {
    if (this.is_empty()){
      return;
    }
    const curr = this.top;
    const next = curr.next;
    curr.next = prev;
    this.top = next;
    this.reverse(curr);
    
  }
// x<1<2<3<4
//     n c p
// x<1 2>3>4>x
// n c p      
  reverse() {
    if (this.is_empty()){
      return;
    }
    let prev = this.top;
    let curr = prev.next;
    let next = undefined;
    prev.next = undefined;
    while (curr != undefined){
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.top = prev;
  }
}

module.exports = { Stack };
