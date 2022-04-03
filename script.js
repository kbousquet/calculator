// Call buttons
const sevenButton = document.getElementById('seven-button');
const eightButton = document.getElementById('eight-button');
const nineButton = document.getElementById('nine-button');
const divideButton = document.getElementById('divide-button');
const fourButton = document.getElementById('four-button');
const fiveButton = document.getElementById('five-button');
const sixButton = document.getElementById('six-button');
const multiplyButton = document.getElementById('multiply-button');
const oneButton = document.getElementById('one-button');
const twoButton = document.getElementById('two-button');
const threeButton = document.getElementById('three-button');
const minusButton = document.getElementById('minus-button');
const clearButton = document.getElementById('clear-button');
const zeroButton = document.getElementById('zero-button');
const equalButton = document.getElementById('equal-button');
const plusButton = document.getElementById('plus-button');

// Call display values
let valueInput = document.getElementById('value-input');
let calcText = document.getElementById('calculation');
let calcValue = 0;



function operate(num1, operator, num2){
    
    switch(operator){
        case '+':
            calcValue = num1 + num2;
            calcText.innerText = `${calcValue}`;
            break;
        case '-':
            calcValue = num1 - num2;
            calcText.innerText = `${calcValue}`;
            break;
        case '*':
            calcValue = num1 * num2;    
            calcText.innerText = `${calcValue}`;
            break;
        case '/':
            calcValue = num1 / num2;
            calcText.innerText = `${calcValue}`;
            break;
    }

}

function populateDisplay(num1, operator, num2){
    valueInput.innerText = `${num1} ${operator} ${num2}`;
}


populateDisplay(2,'*',5);

operate(2,'*',5);
