const OPERATIONS = {
  add,
  subtract,
  multiply,
  divide
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === 0) {
    console.error("Attempted to divide by 0");
    return "error"
  }

  return x / y;
}

function operate(x, y, operation) {
  return OPERATIONS[operation](x, y)
}