document.addEventListener('DOMContentLoaded', () => {
  const valueEl = document.querySelector('.value');
  const clearButton = document.querySelector('.clear');
  const equalButton = document.querySelector('.equal');
  const numberButtons = document.querySelectorAll('.button:not(.operator):not(.function)');
  const operatorButtons = document.querySelectorAll('.operator:not(.equal)');
  const functionButtons = document.querySelectorAll('.function');

  let currentValue = '0';
  let currentOperator = null;
  let operand = null;

  const updateDisplay = () => {
    valueEl.textContent = currentValue;
  };

  const handleNumberClick = (numStr) => {
    if (currentValue === '0') {
      currentValue = numStr;
    } else {
      currentValue += numStr;
    }
    updateDisplay();
  };

  const handleOperatorClick = (operator) => {
    if (operand !== null) {
      currentValue = calculate();
    }
    operand = parseFloat(currentValue);
    currentValue = '0';
    currentOperator = operator;
    updateDisplay();
  };

  const calculate = () => {
    const previousValue = operand;
    const currentValueNum = parseFloat(currentValue);

    switch (currentOperator) {
      case '÷':
        return previousValue / currentValueNum;
      case '×':
        return previousValue * currentValueNum;
      case '−':
        return previousValue - currentValueNum;
      case '+':
        return previousValue + currentValueNum;
      default:
        return currentValueNum;
    }
  };

  clearButton.addEventListener('click', () => {
    currentValue = '0';
    currentOperator = null;
    operand = null;
    updateDisplay();
  });

  equalButton.addEventListener('click', () => {
    if (currentOperator && operand !== null) {
      currentValue = calculate();
      currentOperator = null;
      operand = null;
      updateDisplay();
    }
  });

  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      handleNumberClick(button.textContent);
    });
  });

  operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      handleOperatorClick(button.textContent);
    });
  });

  functionButtons.forEach(button => {
    button.addEventListener('click', () => {
      
      currentValue = (parseFloat(currentValue) * -1).toString();
      updateDisplay();
    });
  });
});



