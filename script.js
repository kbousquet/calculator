// Call buttons
const equalButton = document.querySelector('.equal-button');
const operandButtons = document.querySelectorAll('.operation-button');
const digitButtons = document.querySelectorAll('.digit-button');
const clearButton = document.querySelector('.clear-button');

// Call display elements
const valueInput = document.getElementById('value-input');
const ansText = document.getElementById('calculation');

// Store num1, num2, and operator inputs
let num1 = [];
let num1Display = '';
let num1Input;  // store num1 as an integer for the operate function

let num2 = [];
let num2Display = '';
let num2Input;  // store num2 as an integer for the operate function

let operatorInput;

// Store answer variable
let ans;

// Trigger handlers
let firstPass = true;
let stopChain = false;

// Setup functions
function calculate(){
    num2Input = parseInt(num2Display);
    operate(num1Input, operatorInput, num2Input);
    calcContinue();
    
};

function operate(num1, operator, num2){
    switch(operator){
        case '+':
            ans = num1 + num2;
            ans = Math.round(ans*100)/100;
            ansText.innerText = `= ${ans}`;
            break;
        case '-':
            ans = num1 - num2;
            ans = Math.round(ans*100)/100;
            ansText.innerText = `= ${ans}`;
            break;
        case '*':
            ans = num1 * num2;
            ans = Math.round(ans*100)/100;
            ansText.innerText = `= ${ans}`;
            break;
        case '/':
            ans = num1 / num2;
            ans = Math.round(ans*100)/100;
            ansText.innerText = `= ${ans}`;
            break;
    }
};

function fullReset(){
    num1 = [];
    num1Display = '';
    num1Input = undefined;
    num2 = [];
    num2Display = '';
    num2Input = undefined;
    operatorInput = undefined;
    valueInput.style.visibility = 'hidden';
    ansText.innerText = '0';
    firstPass = true;
    stopChain = false;
};

function calcContinue(){
    num1 = [];
    num1Display = '';
    num1Input = ans;  
    ans = 0;

    num2 = [];
    num2Display = '';
    num2Input = 0;

    operatorInput = '';
};

function digits(value){
    // Parse buttons to num2 after the operand has been clicked
    if (!firstPass){
        num2.push(value);
        num2Display = +num2.join("");
        valueInput.textContent = num2Display;
    }
    
    // First run - Parse buttons to num1 before the operand has been clicked
    else if (firstPass){
        num1.push(value);
        num1Display = +num1.join("");
        valueInput.textContent = num1Display;
        valueInput.style.visibility = 'visible';
    } 
    // Selecting a digit after equal
    if (!firstPass && stopChain) {
        fullReset();
        digits(value);
    } 
};

function operators(operator){
    // Throw error if user selects an operand before inputting num1
    if (firstPass && num1.length === 0){
        valueInput.style.visibility = 'visible';
        valueInput.textContent = 'ERROR';
    }
    // Operator on first run
    else if (firstPass){
        valueInput.textContent = operator;
        operatorInput = operator;
        num1Input = parseInt(num1Display);
        firstPass = false;   
    }

    // Stringing multiple operations
    else if (!firstPass && num2.length>0){

        if (operatorInput === '÷' && num2Input === 0){
            fullReset();
            valueInput.textContent = 'ERROR';
            valueInput.style.visibility = 'visible';
        }

        else{
            valueInput.textContent = operator;
            calculate();
            operatorInput = operator;   
        }
    }
    // Clicking operator after equal sign
    else if (stopChain && num2.length ===0){
        valueInput.textContent = operator;
        operatorInput = operator;
        stopChain = false;    
    }
};

function equals(){
    // Throw error if user tries to divide by 0
    if (operatorInput === '÷' && num2Display === 0){
        fullReset();
        valueInput.textContent = 'ERROR';
        valueInput.style.visibility = 'visible';
    }

    else {
        calculate();
        stopChain = true;
    };
}

function runCalculator(){
    // Digit buttons
    digitButtons.forEach(button => button.addEventListener('click',()=>{
        let value = button.innerText;
        digits(value);
    }));

    // Keypresses
    document.addEventListener('keydown', function(e){
        let validDigits = ['1','2','3','4','5','6','7','8','9'];
        let validOperators = ['+','-','*','/'];
        let value = e.key;
        // digits
        if (validDigits.indexOf(value) !== -1){
            digits(value);
        }
        // operators
        else if (validOperators.indexOf(value) !== -1){
            operators(value);
        }
        // equal sign
        else if (value === 'Enter'){
            equals();
        }
        // clear
        else if (value === 'Escape'){
            fullReset();
        }
    });

    // Operand buttons
    operandButtons.forEach(button => button.addEventListener('click',()=>{
        let value = button.innerText;
        operators(value);
    }));

    // Equal button
    equalButton.addEventListener('click', () => {
        equals();
    });

    // Clear button
    clearButton.addEventListener('click', () => {
        fullReset();        
    });
} 

runCalculator();