let firstNumber = '';
let secondNumber = '';
let operator = '';
let shouldResetScreen = false;

const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const decimalButton = document.getElementById('decimal');
const backspaceButton = document.getElementById('backspace');

// Basic operations
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return '😱 No divide by zero!';
  return a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
}

// Digits
digitButtons.forEach(btn =>
  btn.addEventListener('click', () => appendNumber(btn.textContent))
);

// Operators
operatorButtons.forEach(btn =>
  btn.addEventListener('click', () => setOperator(btn.textContent))
);

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
decimalButton.addEventListener('click', appendDecimal);
backspaceButton.addEventListener('click', backspace);

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetScreen) resetScreen();
  display.textContent += number;
}

function resetScreen() {
  display.textContent = '';
  shouldResetScreen = false;
}

function clear() {
  display.textContent = '0';
  firstNumber = '';
  secondNumber = '';
  operator = '';
}

function appendDecimal() {
  if (shouldResetScreen) resetScreen();
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function backspace() {
  display.textContent = display.textContent.toString().slice(0, -1);
  if (display.textContent === '') display.textContent = '0';
}

function setOperator(op) {
  if (operator !== '') evaluate();
  firstNumber = display.textContent;
  operator = op;
  shouldResetScreen = true;
}

function evaluate() {
  if (operator === '' || shouldResetScreen) return;
  if (operator === '/' && display.textContent === '0') {
    display.textContent = '😱 No divide by zero!';
    firstNumber = '';
    operator = '';
    return;
  }
  secondNumber = display.textContent;
  display.textContent = roundResult(operate(operator, firstNumber, secondNumber));
  firstNumber = display.textContent;
  operator = '';
  shouldResetScreen = true;
}

function roundResult(number) {
  if (typeof number === 'string') return number; // for error message
  return Math.round(number * 1000) / 1000;
}

// Optional: Keyboard support
window.addEventListener('keydown', handleKeyboard);

function handleKeyboard(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === '.') appendDecimal();
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') backspace();
  if (e.key === 'Escape') clear();
  if (['+', '-', '*', '/'].includes(e.key)) setOperator(e.key);
}

