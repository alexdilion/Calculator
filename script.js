const OPERATIONS = {
    add,
    subtract,
    multiply,
    divide,
};

const OPERATOR_SIGNS = {
    add: "+",
    subtract: "-",
    multiply: "×",
    divide: "÷",
};

const equationText = document.querySelector("#equation");
const resultText = document.querySelector("#result");
const clearButton = document.querySelector("#clear");
const equalsButton = document.querySelector("#operate");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

let firstTerm = "";
let secondTerm = "";
let currentOperator = "";
let result = "";
let newEquation = true;
let onFirstTerm = true;

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
    return x / y;
}

function updateDisplay() {
    equationText.textContent = firstTerm;

    if (currentOperator !== "") {
        equationText.textContent += ` ${OPERATOR_SIGNS[currentOperator]}`;
    }

    if (secondTerm !== "") {
        equationText.textContent += ` ${secondTerm}`;
    }

    if (result !== "") {
        equationText.textContent += " =";
        resultText.textContent = result;
    }

    if (result === "") {
        resultText.textContent = "";
    }
}

function clear() {
    firstTerm = "";
    secondTerm = "";
    currentOperator = "";
    result = "";
    newEquation = true;
    onFirstTerm = true;

    resultText.textContent = "";
    equationText.textContent = "";
}

function onNumberPressed(number) {
    number = number.target.getAttribute("data-value");

    if (result) clear();

    if (onFirstTerm) {
        firstTerm += number;
    } else {
        secondTerm += number;
    }

    updateDisplay();
}

function onOperatorPressed(operator) {
    operator = operator.target.getAttribute("data-value");
    currentOperator = operator;

    if (newEquation) {
        onFirstTerm = false;
    } else {
        firstTerm = result;
        secondTerm = "";
        result = "";
    }

    updateDisplay();
}

function operate() {
    let x, y;

    if (firstTerm === "" && secondTerm === "") return;

    if (result === "") {
        x = Number(firstTerm);
    } else {
        x = Number(result);
        firstTerm = result;
        updateDisplay();
    }

    y = Number(secondTerm);

    if (y === 0 && currentOperator === "divide") {
        alert("Error! You tried to divide by 0!");
        secondTerm = "";
        updateDisplay();
        return;
    }

    if (currentOperator === "") {
        result = firstTerm;
        newEquation = false;
        updateDisplay();
        return;
    }

    result = OPERATIONS[currentOperator](x, y).toString();
    newEquation = false;
    updateDisplay();
}

numberButtons.forEach((btn) => {
    btn.addEventListener("click", onNumberPressed);
});

operatorButtons.forEach((btn) => {
    btn.addEventListener("click", onOperatorPressed);
});

equalsButton.addEventListener("click", operate);
clearButton.addEventListener("click", clear);
