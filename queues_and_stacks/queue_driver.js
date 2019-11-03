const {Queue} = require('./Queue');
const {Stack} = require('./Stack');

const q = new Queue(1);
console.log('q.is_empty: ' + q.is_empty());
console.log('q.peek: ' + q.peek());
q.push(2);
console.log('q.is_empty: ' + q.is_empty());
console.log('q.peek: ' + q.peek());
console.log('q.pop: ' + q.pop());
console.log('q.is_empty: ' + q.is_empty());
console.log('q.peek: ' + q.peek());

console.log('q.pop: ' + q.pop());
console.log('q.is_empty: ' + q.is_empty());
// console.log('q.peek: ' + q.peek());




const s = new Stack(1);
s.push(2);
s.push(3);
s.reverse();
// console.log('s.is_empty: ' + s.is_empty());
// console.log('s.peek: ' + s.peek());
// s.push(2);
// console.log('s.is_empty: ' + s.is_empty());
// console.log('s.peek: ' + s.peek());
// console.log('s.pop: ' + s.pop());
// console.log('s.is_empty: ' + s.is_empty());
// console.log('s.peek: ' + s.peek());

// console.log('s.pop: ' + s.pop());
// console.log('s.is_empty: ' + s.is_empty());
// console.log('s.peek: ' + s.peek());