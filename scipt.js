const numberDisplay = document.querySelector(".number-display");
const numBtn = document.querySelectorAll(".btn-numbers");
const operationBtn = document.querySelectorAll(".btn-operation");
const minusPlusBtn = document.querySelector("#btn-minus-plus")
const equalBtn = document.querySelector("#btn-equals");
const clearBtn = document.querySelector("#btn-clear");
const backspaceBtn = document.querySelector("#btn-backspace");
const decimalBtn = document.querySelector('#btn-decimal');

let displayNumber = "0";
let firstNumber = null;
let secondNumber = null;
let operator = "";
let result = null;

const add = (num1, num2) => {
  let x = parseFloat(num1)
  let y = parseFloat(num2)
  return x + y;
};

const substract = (num1, num2) => {
  let x = parseFloat(num1)
  let y = parseFloat(num2)
  return x - y;
};

const divide = (num1, num2) => {
  let x = parseFloat(num1)
  let y = parseFloat(num2)
  if (y === 0) {
    return "error"
  }
  return x / y;
};

const multiply = (num1, num2) => {
  let x = parseFloat(num1)
  let y = parseFloat(num2)
  return x * y;
};

const operate = (operator, num1, num2) => {
  switch(operator) {
    case "+":
      result = add(num1, num2);
      return result;
      case "-":
      result = substract(num1, num2);
      return result;
    case "/":
      result = divide(num1, num2);
      return result;
    case "*":
      result = multiply(num1, num2);
      return result;
  }
}

const updateDisplay = () => {
  if (result !== null) {
    displayNumber = roundNum(result, 15).toString(); 
  }
  numberDisplay.innerText = displayNumber;
  checkDecimal();
}

const inputNumber = (num) => {
  if(operator === "") {
    if(displayNumber == 0) {
      displayNumber = num;
    } else if(displayNumber == firstNumber) {
      displayNumber = num;
    } else {
      displayNumber += num;
    }
  } else {
    if(displayNumber == firstNumber) {
      displayNumber = num;
    } else {
      displayNumber += num;
    }
  }
}

const inputOperation = (opVal) => {
  if(firstNumber !== null) {
    secondNumber = displayNumber;
    operate(operator, firstNumber, secondNumber);
    updateDisplay();
    firstNumber = displayNumber;
    operator = opVal
    result = null;
  } else {
    firstNumber = displayNumber;
    operator = opVal;
  }
}

const inputEquals = () => {
  secondNumber = displayNumber;
  operate(operator, firstNumber, secondNumber);
  secondNumber = null;
  firstNumber = result;
  operator = "";
}

const inputMinusPlus = () => {
  displayNumber *= -1;
}

const inputDecimal = (dec) => {
  displayNumber += dec;
}

const checkDecimal = () => {
  if (displayNumber.includes(".")) {
    decimalBtn.disabled = true;
  } else {
    decimalBtn.disabled = false;
  }
}

const clear = () => {
  displayNumber = "0";
  firstNumber = null;
  secondNumber = null;
  operator = "";
  result = null;
}

const backspace = () => {
  if (displayNumber.length === 1) {
    displayNumber = "0";
  } else {
    displayNumber = displayNumber.slice(0, displayNumber.length - 1);
  }
}

const roundNum = (num, places) => {
  return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

numBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    inputNumber(btn.value);
    updateDisplay();
  });
});

operationBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    inputOperation(btn.value);
  })
});

minusPlusBtn.addEventListener("click", () => {
  inputMinusPlus();
  updateDisplay();
})

decimalBtn.addEventListener("click", () => {
  inputDecimal(decimalBtn.value);
  updateDisplay();
})

equalBtn.addEventListener("click", () => {
  inputEquals();
  updateDisplay();
  result = null;
});

clearBtn.addEventListener("click", () => {
  clear();
  updateDisplay();
});

backspaceBtn.addEventListener("click", () => {
  backspace();
  updateDisplay();
})