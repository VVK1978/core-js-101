/* eslint-disable no-sparse-arrays */
const wins = [
  0b111000000,
  0b000111000,
  0b000000111,
  0b100010001,
  0b001010100,
  0b100100100,
  0b010010010,
  0b001001001,
];
function check(data) {
  const temp = wins[0].toString();
  console.log(temp);
}


function evaluateTicTacToePosition(position) {
  const temp = position.join(',').split(',');
  const x = `${temp.map((el) => (el === 'X' ? 1 : 0)).join('')}`;
  const zero = `${temp.map((el) => (el === '0' ? 1 : 0)).join('')}`;
  // console.log(zero);
  const xRes = check(x);
  if (wins.includes(+x)) {
    console.log('wins X');
    return 'X';
  }
  if (wins.includes(+zero)) {
    console.log('win 0');
    return '0';
  }
  return undefined;
}

const position = [
  ['0', '0', '0'],
  [, 'X', '0'],
  [,, 'X']];
console.log(evaluateTicTacToePosition(position));
