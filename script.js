// Max decimal places for a result
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

// Contains equation data
let equation = {
    firstOperand: "0",
    secondOperand: "",
    operator: "",
    operatorSign: "",
    result: "",
    currentOperand: "firstOperand",
};

// Calculator operations
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

// Add a decimal to the current operand
function addDecimal() {
    // Clear screen if there is a result
    if (equation.result) clear();

    // Check if the number doesn't already have a decimal
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

// Delete last character
function deleteCharacter() {
    if (equation.secondOperand) {
        equation.secondOperand = equation.secondOperand.slice(0, -1);
    } else if (equation.operator) {
        equation.operator = "";
        equation.operatorSign = "";
        equation.currentOperand = "firstOperand";
    } else if (equation.firstOperand !== "0") {
        equation.firstOperand = equation.firstOperand.slice(0, -1);

        if (!equation.firstOperand) {
            equation.firstOperand = "0";
        }
    } else {
        equation.firstOperand = "0";
    }

    // Clear result
    if (equation.result) {
        equation.result = "";
    }

    updateDisplay();
}

// Update calculator's display
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

// Run when a number button is pressed
// Appends inputted number to the relevant operand
function numberPressed(e) {
    let number = e.target.getAttribute("data-value");

    if (equation.result) clear();

    // Remove 0 at the start
    if (equation.firstOperand === "0" && equation.currentOperand === "firstOperand" && number !== "0") {
        equation.firstOperand = "";
    } else return; // Prevent user from entering multiple zeroes at the start

    // Append the number to the current operand
    equation[equation.currentOperand] += number;
    updateDisplay();
}

// Run when an operator button is pressed
// Sets the current operator to the operator clicked
function operatorPressed(e) {
    let operation = e.target.getAttribute("data-value");

    if (equation.result && equation.currentOperand === "firstOperand") {
        equation.firstOperand = equation.result;
        equation.result = "";
    }

    if (!equation.operator) {
        equation.currentOperand = "secondOperand";
    } else if (equation.currentOperand === "secondOperand" && equation.operator && equation.secondOperand) {
        // Run when the user tries to chain operations together (12 + 7 - 2...)
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

// Resets equation data
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

// Perform operation on the equation
function operate() {
    let x, y, result;

    if (equation.firstOperand && equation.operator && equation.secondOperand) {
        // Valid equation, perform operation
        x = Number(equation.firstOperand);
        y = Number(equation.secondOperand);

        if (y === 0 && equation.operator === OPERATIONS.divide) {
            alert("TO INFINITY AND BEYOND..!"); // uh oh
            clear();
            return;
        }

        result = equation.operator(x, y);
        equation.result = result.toString();
    } else if (equation.firstOperand && !equation.operator) {
        equation.result = equation.firstOperand;
    }

    updateDisplay();
}

updateDisplay();

// Handles calculator button clicks
function calculatorButtonPressed(e) {
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
        case "delete-button":
            deleteCharacter();
            break;
    }
}

calculatorButtons.forEach((btn) => btn.addEventListener("click", calculatorButtonPressed));
