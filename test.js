function getMatrixProduct(m1, m2) {
  const newMatrix = new Array(m1.length);
  for (let i = 0; i < m1.length; i += 1) {
    newMatrix[i] = new Array(m2[0].length);
    for (let j = 0; j < m2[0].length; j += 1) {
      newMatrix[i][j] = 0;
      for (let n = 0; n < m1[0].length; n += 1) {
        newMatrix[i][j] += m1[i][n] * m2[n][j];
      }
    }
  }
  return newMatrix;
}


const m1 = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];
const m2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(getMatrixProduct(m1, m2));
