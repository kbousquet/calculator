// Call buttons
const equalButton = document.querySelector('.equal-button');
const operandButtons = document.querySelectorAll('.operation-button');
const digitButtons = document.querySelectorAll('.digit-button');

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
let operandClicked = false;
let calcContinue = false;



function resetInputs(){
    num1 = [];
    num1Display = '';
    num1Input = ans;  
    ans = 0;

    num2 = [];
    num2Display = '';
    num2Input = 0;

    operatorInput = '';
}

function runCalculator(){
    // Digit button triggers
    digitButtons.forEach(button => button.addEventListener('click',()=>{
        // First run - Parse buttons to num1 before the operand has been clicked
        if (!operandClicked){
            num1.push(button.innerText);
            num1Display = +num1.join("");
            valueInput.textContent = num1Display;
            valueInput.style.visibility = 'visible';
        } 
        // Parse buttons to num2 after the operand has been clicked
        else {
            num2.push(button.innerText);
            num2Display = +num2.join("");
            valueInput.textContent = num2Display;
        }
    }));

    // Operand buttons
    operandButtons.forEach(button => button.addEventListener('click',()=>{
        // Throw error if user clicks an operand before inputting num1
        if (!operandClicked && num1.length === 0){
            valueInput.style.visibility = 'visible';
            valueInput.textContent = 'ERROR';
        }
        // Operator on first run
        else if (!operandClicked){
            valueInput.textContent = button.innerText;
            operandClicked = true;
            operatorInput = button.innerText;
            num1Input = parseInt(num1Display);
        }
        // Operator on subsequent runs
        else {
            valueInput.textContent = button.innerText;
            operatorInput = button.innerText;
        }
    }));

    // Equal button
    equalButton.addEventListener('click', () => {
        // Throw error if user tries to divide by 0
        if (operatorInput === '÷' && num2Display === 0){
            valueInput.textContent = 'ERROR';
            calcContinue = false;
            resetInputs();
            num1Input=0;
        }
        // Handle equal button on first run
        else if (!calcContinue){
            num2Input = parseInt(num2Display);
            operate(num1Input, operatorInput, num2Input);
            calcContinue = true;
            resetInputs()
        }
        else {
            num2Input = parseInt(num2Display);
            operate(num1Input, operatorInput, num2Input);
            resetInputs()
        }
    });
} 


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
        case 'x':
            ans = num1 * num2;
            ans = Math.round(ans*100)/100;
            ansText.innerText = `= ${ans}`;
            break;
        case '÷':
            ans = num1 / num2;
            ans = Math.round(ans*100)/100;
            ansText.innerText = `= ${ans}`;
            break;
    }
}


runCalculator();