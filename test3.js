function getIdGeneratorFunction(startFrom) {
  this.startFrom = startFrom;
  return () => {
    this.startFrom += 1;
    return this.startFrom - 1;
  };
}

const getId4 = getIdGeneratorFunction(4);
console.log(getId4());
console.log(getId4());
console.log(getId4());
