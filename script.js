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
const MAX_DECIMALS = 2;

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

function roundNumber(num) {
    if (num % 1 === 0) {
        return num;
    }

    const decimalPlaces = num.toString().split(".")[1].length;

    if (decimalPlaces < MAX_DECIMALS) {
        return num;
    } else {
        return Number(num).toFixed(MAX_DECIMALS);
    }
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

    if (currentOperator && firstTerm && secondTerm && !result) {
        operate();
    }

    currentOperator = operator;

    if (firstTerm === "") {
        return;
    }

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

    // Do nothing if there are no terms
    if (firstTerm === "" && secondTerm === "") return;

    if (result === "") {
        x = Number(firstTerm);
    } else {
        x = Number(result);
        firstTerm = result;
    }

    y = Number(secondTerm);

    x = Number(roundNumber(x));
    y = Number(roundNumber(y));

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

    result = roundNumber(OPERATIONS[currentOperator](x, y));
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
