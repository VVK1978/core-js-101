function logger(func, logFunc) {
  return (...args) => {
    const arg = [];
    args.forEach((element) => arg.push(JSON.stringify(element)));
    const start = `${func.name}(${arg}) starts`;
    const end = `${func.name}(${arg}) ends`;
    logFunc(start);
    const res = func(...args);
    logFunc(end);
    return res;
  };
}


const cosLogger = logger(Math.cos, console.log);
const result = cosLogger(Math.PI);
console.log(result);
