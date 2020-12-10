//array is used for holding the first digits and an operator.
//key: numb1=[0], operator=[1], numb2=userInputStr.
//userInputArr is used to hold final calulation array.
const display = document.getElementById("user-input");
var userInputArr = [];
var userInputStr = ''
var calcScreen = ''

//This function is called onclick for all calculator-buttons.
function appendValue(value) {
    userInputStr += value;
    calcScreen += value;
    display.innerHTML = calcScreen;
};

//Function to append the userInputStr to userInputArr. Called onclick for all operator-buttins.
function selectedOperator(operator) {
    if(userInputStr === '') {
        return;
    }else{
        calcScreen += operator;
        display.innerHTML = calcScreen;
        userInputArr.push(userInputStr);
        userInputArr.push(operator);
        userInputStr = '';
    }
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
    if (parseFloat(b) == 0){
        return "Cannot divide by zero.";
    } else {
        return Math.round(a / b);
    };
};

//Function containing switch statement to direct numbers to the correct operator.
function operate(operator, a, b) {
    numb1 = parseInt(a)
    numb2 = parseInt(b)
    switch(operator){
        case '+':
            calcScreen += add(numb1, numb2);
            display.innerHTML = calcScreen;
            return add(numb1, numb2);
        case '-':
            calcScreen += subtract(numb1, numb2);
            display.innerHTML = calcScreen;
            return subtract(numb1, numb2);
        case 'x':
            calcScreen += multiply(numb1, numb2);
            display.innerHTML = calcScreen;
            return multiply(numb1, numb2);
        case '÷':
            calcScreen += division(numb1, numb2);
            display.innerHTML = calcScreen;
            return division(numb1, numb2);
    };
};

function calcClear() {
    userInputArr.length = 0;
    userInputStr = '';
    calcScreen = '';
    display.innerHTML = '';
};

