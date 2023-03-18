const OPERATIONS = {
    add,
    subtract,
    multiply,
    divide,
};

const equationText = document.querySelector("#equation");
const resultText = document.querySelector("#result")
const clearButton = document.querySelector("#clear");
const numberButtons = document.querySelectorAll(".number");

let displayValue = "";

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
        return "error";
    }

    return x / y;
}

function operate(x, y, operation) {
    return OPERATIONS[operation](x, y);
}

function updateEquation(value) {
    equationText.textContent += value;
    displayValue = equationText.textContent;
}

function updateResult(result) {
    resultText.textContent = result;
}

function clearDisplay() {
    equationText.textContent = "";
    resultText.textContent = "";
}

numberButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.getAttribute("data-number");
        updateEquation(value);
    });
});

clearButton.addEventListener("click", clearDisplay);
