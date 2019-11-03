function getPermutations(string) {
  var results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }

  for (var i = 0; i < string.length; i++) 
    var firstChar = string[i];
    var otherChar = string.substring(0, i) + string.substring(i + 1);
    var otherPermutations = getPermutations(otherChar);

    for (var j = 0; j < otherPermutations.length; j++) {
      results.push(firstChar + otherPermutations[j]);
    }
  }
  return results;
}

var permutation = getPermutations('YESX');
console.log('Total permutation: ' + permutation.length);
console.log(permutation);