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

operandButtons.forEach(button => button.addEventListener('click',()=>{
    valueInput.textContent = button.innerText;
    operandClicked = true;
    operatorInput = button.innerText;
    num1Input = parseInt(num1Display);
    runCalculator()
}));

// Handle equal button
equalButton.addEventListener('click', () => {
    equalClicked = true;
    num2Input = parseInt(num1Display);
    operate(num1Input, operatorInput, num2Input);
    num1Input = ans;
    calcContinue = true;
    runCalculator();
});

function runCalculator(){
    
    // Parse buttons to num2 after the operand has been clicked
    if (operandClicked && !calcContinue){
        digitButtons.forEach(button => button.addEventListener('click',()=>{
            num2.push(button.innerText);
            num2Display = +num2.join("");
            valueInput.textContent = num2Display;
            valueInput.style.visibility = 'visible';
        }));
    } 

    // Parse buttons to num1 before the operand has been clicked
    else if (!operandClicked && !calcContinue){    
        digitButtons.forEach(button => button.addEventListener('click',()=>{
            num1.push(button.innerText);
            num1Display = +num1.join("");
            valueInput.textContent = num1Display;
            valueInput.style.visibility = 'visible';
        }));
    }
    
};


function operate(num1, operator, num2){
    switch(operator){
        case '+':
            ans = num1 + num2;
            ansText.innerText = `${ans}`;
            break;
        case '-':
            ans = num1 - num2;
            ansText.innerText = `${ans}`;
            break;
        case 'x':
            ans = num1 * num2;    
            ansText.innerText = `${ans}`;
            break;
        case '÷':
            ans = num1 / num2;
            ansText.innerText = `${ans}`;
            break;
    }

}


runCalculator();