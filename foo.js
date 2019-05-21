
function swap(i, j, q) {
  const array_i = i - 1;
  const array_j = j - 1;
  const tmp_q = q.slice();
  const x = Object.assign({}, tmp_q[array_i]);
  const y = Object.assign({}, tmp_q[array_j]);
  y.index += -1;
  y.dist += -1;
  x.index += 1;
  x.dist += 1;
  tmp_q[array_i] = y;
  tmp_q[array_j] = x;
  return tmp_q;
}

function swap2(i, j, q) {
  const array_i = i - 1;
  const array_j = j - 1;

  const x = Object.assign({}, q[array_i]);
  const y = Object.assign({}, q[array_j]);
  y.index += -1;
  y.dist += -1;
  x.index += 1;
  x.dist += 1;
  q[array_i] = y;
  q[array_j] = x;
}

function swap2(i, j, q) {
  const array_i = i - 1;
  const array_j = j - 1;

  const x = Object.assign({}, q[array_i]);
  const y = Object.assign({}, q[array_j]);
  y.index += i - j;
  y.dist += i - j;
  x.index += j - i;
  x.dist += j - i;
  q[array_i] = y;
  q[array_j] = x;
}

function minimumBribes(q) {
  console.log(q);
  const dist = q.map((x, index) => (index + 1) - x);
  console.log(dist);
  const is_valid = dist.reduce((acc, x) => acc && (x >= -2), true);
  if (!is_valid) {
      console.log('Too chaotic');
      return;
  }

  const xxx = q.reduce((acc, x, index) => {
      acc.push({ dist: (index + 1) - x, val: x, index: (index + 1) });
      return acc;
  }, []);

  let yyy = xxx.slice().filter(p => p.dist < 0);
  let bribe = 0;
  while (yyy.length > 0) {
      const x = yyy.slice(-1)[0];
      const old_dist = x.dist;
      if (old_dist === -1) {
          // xxx = swap(x.index, x.index + 1, xxx);
          swap2(x.index, x.index + 1, xxx);
          bribe += 1;
      } else if (old_dist === -2) {
          // xxx = swap(x.index, x.index + 1, xxx);
          // xxx = swap(x.index + 1, x.index + 2, xxx);
          swap2(x.index, x.index + 1, xxx);
          swap2(x.index + 1, x.index + 2, xxx);
          bribe += 2;
      } else if (old_dist > 0) {
          swap2(x.index + 1, x.index, xxx);
          bribe += 1;
      }
      yyy = xxx.slice().filter(p => p.dist < 0);
  }
  
  console.log(bribe);
}
 /*
1 2 3 4   4,3
1 2 4 3   4,2
1 4 2 3   3,2
1 4 3 2   
0-2 0 2
*/

1 3 4 2
0-1-1 2 