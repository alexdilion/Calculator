const MAX_DECIMALS = 3;

// Operations that can be done
const OPERATIONS = {
    add,
    subtract,
    multiply,
    divide,
};

// Signs for operators
const OPERATOR_SIGNS = {
    add: "+",
    subtract: "-",
    multiply: "×",
    divide: "÷",
};

// Calculator elements
const equationText = document.querySelector("#equation-text");
const resultText = document.querySelector("#result-text");
const calculatorButtons = document.querySelectorAll(".buttons button");

let equation = {
    firstOperand: "0",
    secondOperand: "",
    operator: "",
    operatorSign: "",
    result: "",
    currentOperand: "firstOperand",
};

function add(x, y) {
    return roundNumber(x + y);
}

function subtract(x, y) {
    return roundNumber(x - y);
}

function multiply(x, y) {
    return roundNumber(x * y);
}

function divide(x, y) {
    return roundNumber(x / y);
}

function addDecimal() {
    if (equation.result) clear();

    if (equation[equation.currentOperand].indexOf(".") === -1) {
        if (equation[equation.currentOperand] === "") {
            equation[equation.currentOperand] = "0";
        }

        equation[equation.currentOperand] += ".";
    }

    updateDisplay();
}

// Round x down to MAX_DECIMALS places.
function roundNumber(x) {
    let decimalPlaces = 10 ** MAX_DECIMALS;
    return Math.round(x * decimalPlaces) / decimalPlaces;
}

function updateDisplay() {
    if (equation.firstOperand && equation.operator && equation.secondOperand) {
        equationText.textContent = `${equation.firstOperand} ${equation.operatorSign} ${equation.secondOperand}`;
    } else if (equation.firstOperand && equation.operator) {
        equationText.textContent = `${equation.firstOperand} ${equation.operatorSign} `;
    } else {
        equationText.textContent = `${equation.firstOperand}`;
    }

    if (equation.result && equationText.textContent.slice(1, -1) !== "=") {
        equationText.textContent += " =";
    }

    resultText.textContent = equation.result;
}

function numberPressed(e) {
    let number = e.target.getAttribute("data-value");

    if (equation.result) clear();

    if (equation.firstOperand === "0" && equation.currentOperand === "firstOperand") {
        if (number === "0") {
            return;
        }

        equation.firstOperand = "";
    }

    equation[equation.currentOperand] += number;
    updateDisplay();
}

function operatorPressed(e) {
    let operation = e.target.getAttribute("data-value");

    if (equation.result && equation.currentOperand === "firstOperand") {
        clear();
        return;
    }

    if (!equation.operator) {
        equation.currentOperand = "secondOperand";
    } else if (equation.currentOperand === "secondOperand" && equation.operator && equation.secondOperand) {
        operate();

        if (!equation.result) return;

        equation.firstOperand = equation.result;
        equation.currentOperand = "secondOperand";
        equation.result = "";
        equation.secondOperand = "";
    }

    equation.operator = OPERATIONS[operation];
    equation.operatorSign = OPERATOR_SIGNS[operation];
    updateDisplay();
}

function clear() {
    equation = {
        firstOperand: "0",
        secondOperand: "",
        operator: "",
        operatorSign: "",
        result: "",
        currentOperand: "firstOperand",
    };

    updateDisplay();
}

function operate() {
    let x, y, result;

    if (equation.firstOperand && equation.operator && equation.secondOperand) {
        x = Number(equation.firstOperand);
        y = Number(equation.secondOperand);

        if (y === 0 && equation.operator === OPERATIONS.divide) {
            alert("TO INFINITY AND BEYOND..!");
            clear();
            return;
        }

        result = equation.operator(x, y);
        equation.result = result.toString();
    } else if (equation.firstOperand && !equation.operator) {
        equation.result = equation.firstOperand;
    }
    console.table(equation);
    updateDisplay();
}

updateDisplay();

function buttonPressed(e) {
    const button = e.target;

    if (button.classList.contains("number-button")) {
        numberPressed(e);
        return;
    }

    if (button.classList.contains("operator-button")) {
        operatorPressed(e);
        return;
    }

    switch (button.id) {
        case "decimal-button":
            addDecimal();
            break;
        case "clear-button":
            clear();
            break;
        case "operate-button":
            operate();
            break;
    }
}

calculatorButtons.forEach((btn) => btn.addEventListener("click", buttonPressed));