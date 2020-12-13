const display = document.getElementById("user-input");
const inputHistory = document.getElementById("input-history");
const numberButtons = document.querySelectorAll(".calculator-buttons");
const operatorButtons = document.querySelectorAll(".operator-buttons");
const clearButton = document.getElementById("clear-button");
const equalsButton = document.getElementById("equals-button")

var calcHistory = '';
var toBeCleaned = false;

//equalsPressed is used as a flag for clearing the calculator when
//user enters a number after the equals button has been pressed.
var equalsPressed = false;
var totalSum = null;
var firstNumb = null;
var secondNumb = null;
var operator = null;

//Function used for displaying the current calculations history.
function addToHistory(value){
    calcHistory += value;
    inputHistory.textContent = calcHistory;
}

//Function used for displaying the users inputs and total sum.
function displayValue(value) {
    if(!equalsPressed){
        display.innerHTML += value;
    } else {
        calcClear();
        equalsPressed = false;
        display.textContent += value;
    };
};

//Function used to pull textContent from the calulator display.
function getDisplayValue() {
    return display.textContent;
};

//Function to clear the the calculator display.
function clearDisplay() {
    display.textContent = "";
};

//Function to add the selected operator to the operator variable.
function setOperator(selOperator) {
    if (operator == null) {
        operator = selOperator;
        addToHistory(getDisplayValue());
        addToHistory(selOperator);
        clearDisplay();
    } else if (firstNumb && secondNumb) {
        totalSum = operate(Number(firstNumb), Number(secondNumb), operator);
        clearDisplay();
        addToHistory(secondNumb);
        addToHistory(selOperator);
        displayValue(totalSum);
        firstNumb = totalSum;
        secondNumb = null;
        operator = selOperator;
    };
};
//Function for setting the fistNumb and secondNumb variables.
function setNumbers(value) {
    if (firstNumb == null) {
        firstNumb = value;
    } else {
        secondNumb = value;
    };
};

//Function for generating results when an operator and secondNumb have been entered.
function generateResult() {
    if (firstNumb && operator && !toBeCleaned && !secondNumb) {
        setNumbers(getDisplayValue());
        return operate(Number(firstNumb), Number(secondNumb), operator);
    } else {
        return false;
    };
};

//Function containing switch statement to direct numbers to the correct operator.
function operate(a, b, operator) {
    switch(operator) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "x":
            return multiply(a, b);
            break;
        case "÷":
            return division(a, b);
            break;
    };
};

//Function to clean calculator values.
function calcClear() {
    firstNumb = null;
    secondNumb = null;
    totalSum = 0;
    operator = null;
    calcHistory = ''
    inputHistory.textContent = '';
    clearDisplay();
};

//Functions for each respective operator.
function add(a, b) {
    return a + b;
};
function subtract(a, b) {
    return a - b;
};
function multiply(a, b) {
    return a * b;
};
function division(a, b) {
    if (parseInt(b) == 0){
        return "Cannot divide 0";
    } else {
        var newSum = a / b;
        return Math.floor(newSum);
    };
};

//Event listeners
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', (e) => {
        if (toBeCleaned) {
            clearDisplay();
        }
        displayValue(e.target.value);
        //addToHistory(e.target.value);
        toBeCleaned = false;
    })
})

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', (e) => {
        setNumbers(getDisplayValue());
        setOperator(e.target.value);
        toBeCleaned = true;
    })
})

equalsButton.addEventListener('click', () => {
    addToHistory(getDisplayValue());
    addToHistory("=");
    totalSum = generateResult();
    clearDisplay();
    if (totalSum) {
        displayValue(totalSum);
    }
    equalsPressed = true;
})

clearButton.addEventListener('click', () => {
    calcClear();
})