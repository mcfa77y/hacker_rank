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

function partition(array, lo_index, hi_index) {
  console.log('partitioning\n\tx' + array.slice(lo_index, (hi_index - lo_index)), 'x\n\t', lo_index, hi_index);
  // const pivot = array[Math.floor((hi + lo) / 2)];
  const pivot_value = array[hi_index];
  console.log('\tpivot value', pivot_value);
  while (lo_index <= hi_index) {
    while (array[lo_index] < pivot_value) {
      lo_index += 1;
    }
    while (array[hi_index] > pivot_value) {
      hi_index -= 1;
    }
    if (lo_index <= hi_index) {
      swap(array, lo_index, hi_index);
      lo_index += 1;
      hi_index -= 1;
    }
  }
  return lo_index;
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


// let arr = [9, 2, 6, 4, 3, 5, 1];
// let arr = [1,2,4,5,3];
let arr = [10, 80, 30, 90, 40, 50, 70];
// partition(arr, 0, arr.length - 1);
// let arr = [10, 80, 30, 90, 40, 50, 70];
quicksort(arr, 0, arr.length - 1, 1);