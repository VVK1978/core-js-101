function findFirstSingleChar(str) {
  const letterCount = str.split('').reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr] += 1;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {});
  const keys = Object.keys(letterCount);
  return keys.map((key) => (letterCount[key] === 1 ? key : '')).join('')[0];
}

console.log(findFirstSingleChar('The quick brown fox jumps over the lazy dog'));
