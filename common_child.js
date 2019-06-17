function commonChild(s1, s2) {
  let len = s1.length;
  let grid = Array.from(Array(2).fill(0), () => new Array(len + 1).fill(0));
  for (let i = 1; i <= len; i += 1) {
    const s1_v = s1[i - 1];
    for (let j = 1; j <= len; j += 1) {
      console.log(i, j);
      const s2_v = s2[j - 1];

      if (s1_v == s2_v) {
        grid[i][j] = grid[i - 1][j - 1] + 1;
      } else {
        grid[i][j] = Math.max(grid[i][j - 1], grid[i - 1][j]);
      }
    }
  }
  console.table(grid);
  return grid[len][len];
}

commonChild("SHINCHAN".split(""), "NOHARAAA".split(""));
