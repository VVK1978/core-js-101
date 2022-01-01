function sortDigitNamesByNumericOrder(arr) {
  const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  return arr
    .map((element) => numbers.indexOf(element))
    .sort()
    .map((element) => numbers[element]);
}

console.log(sortDigitNamesByNumericOrder(['nine', 'eight', 'nine', 'eight']));
