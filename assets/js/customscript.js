// Global variables to store calculator state
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let displayValue = '';

// Function to update the display with the current displayValue
function updateDisplay() {
    const display = document.getElementById('display');
    display.value = displayValue;
}

// Function to append a number to the current operand and update the display
function appendNumber(number) {
    if (currentOperation === null) {
        firstOperand += number;
        displayValue += number;
    } else {
        secondOperand += number;
        displayValue += number;
    }
    updateDisplay();
}

// Function to set the current operation and update the display
function setOperation(operation) {
    if (firstOperand !== '' && secondOperand !== '') {
        calculate(); // Auto calculate if there are existing operands and operation
    }
    currentOperation = operation;
    displayValue += ` ${operation} `;
    updateDisplay();
}

// Function to clear the display and reset the calculator state
function clearDisplay() {
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    displayValue = '';
    updateDisplay();
}

// Function to perform the calculation based on the current operation and display the result
function calculate() {
    if (currentOperation === null || secondOperand === '') {
        return;
    }

    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    if (isNaN(num1) || isNaN(num2)) {
        displayValue = 'Error';
        updateDisplay();
        return;
    }

    let result;
    switch (currentOperation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                displayValue = 'Error: Divide by zero';
                updateDisplay();
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }

    displayValue = result.toString();
    updateDisplay();

    // Reset operands and operation for further calculations
    firstOperand = result.toString();
    secondOperand = '';
    currentOperation = null;
}

// Event listener to handle key presses (for additional interactivity)
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/\d/.test(key)) {
        // Digit key pressed
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        // Operator key pressed
        setOperation(key);
    } else if (key === 'Enter' || key === '=') {
        // Enter or Equals key pressed (to calculate)
        calculate();
    } else if (key === 'Escape') {
        // Escape key pressed (to clear)
        clearDisplay();
    }
});
