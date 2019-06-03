function quicksort(arr, lo, hi, id) {
  console.log('starting:', id);
  if (lo < hi) {
    let pivot_index = partition(arr, lo, hi);
    quicksort(arr, lo, pivot_index - 1, 2 * id);
    quicksort(arr, pivot_index + 1, hi, 2 * id + 1);
  }
  else {
    console.log('finished:', id, lo, hi, arr);
    console.log('\n');
  }
}

function partition(array, lo, hi) {
  console.log('\t' + array.slice(lo, (hi - lo)), '\n\t', lo, hi);
  const pivot = array[Math.floor((hi + lo) / 2)];
  console.log('\tpivot value', pivot);
  while (lo <= hi) {
    while (array[lo] < pivot) {
      lo += 1;
    }
    while (array[hi] > pivot) {
      hi -= 1;
    }
    if (lo <= hi) {
      swap(array, lo, hi);
      lo += 1;
      hi -= 1;
    }
  }
  return lo;
}

function swap(arr, a, b) {
  if (a == b) return;
  console.log('\tswapping', arr[a], arr[b]);
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
  console.log(arr);
  console.log('\n');
}

let arr = [9, 2, 6, 4, 3, 5, 1];
// let arr = [10, 80, 30, 90, 40, 50, 70];
quicksort(arr, 0, arr.length - 1, 1);