const buttons = document.getElementsByClassName("button");
const display = document.getElementById('display');
const arr = [...buttons];

arr.forEach((element, index) => {
  element.addEventListener("click", () => {
    element.style.opacity = "1";
 
    arr
      .filter(function (item) {
        return item != element;
      })
      .forEach((item) => {
        item.style.opacity = "0";
      });
  });
});


let currentInput = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';
let result = '';

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', function (event) {
    const clickedValue = event.target.textContent;

    if (!isNaN(clickedValue) || clickedValue === '.') {
      currentInput += clickedValue;
      display.value = currentInput;
    } else if (clickedValue === '+' || clickedValue === '-' || clickedValue === 'x' || clickedValue === '/') {
      if (currentInput !== '') {
        if (firstOperand === '') {
          firstOperand = currentInput;
          operator = clickedValue;
        } else if (secondOperand === '') {
          secondOperand = currentInput;
          firstOperand = operate(firstOperand, secondOperand, operator);
          operator = clickedValue;
          currentInput = '';
          display.value = firstOperand;
        }
        currentInput = '';
      }
    } else if (clickedValue === '=') {
      if (firstOperand !== '' && currentInput !== '') {
        secondOperand = currentInput;
        result = operate(firstOperand, secondOperand, operator);
        display.value = result;
        currentInput = result;
        firstOperand = '';
        secondOperand = '';
        operator = '';
      }
    } else if (clickedValue === 'Reset') {
      currentInput = '';
      firstOperand = '';
      secondOperand = '';
      operator = '';
      result = '';
      display.value = '';
    } else if (clickedValue === 'DEL') {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    }
  });
});


function operate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case '+':
      return (a + b).toString();
    case '-':
      return (a - b).toString();
    case 'x':
      return (a * b).toString();
    case '/':
      return (b === 0 ? 'Error' : (a / b).toString());
    default:
      return 'Error';
  }
}
