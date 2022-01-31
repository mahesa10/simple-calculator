const numberDisplay = document.querySelector(".number-display");
const numBtn = document.querySelectorAll(".btn-numbers");
const operationBtn = document.querySelectorAll(".btn-operation");
const minusPlusBtn = document.querySelector("#btn-minus-plus")
const equalBtn = document.querySelector("#btn-equals");
const clearBtn = document.querySelector("#btn-clear");
const backspaceBtn = document.querySelector("#btn-backspace")

let displayNumber = 0;
let firstNumber = null;
let secondNumber = null;
let operator = "";
let result = null;

const add = (num1, num2) => {
  let x = parseInt(num1)
  let y = parseInt(num2)
  return x + y;
};

const substract = (num1, num2) => {
  let x = parseInt(num1)
  let y = parseInt(num2)
  return x - y;
};

const divide = (num1, num2) => {
  let x = parseInt(num1)
  let y = parseInt(num2)
  if (y === 0) {
    return "error"
  }
  return x / y;
};

const multiply = (num1, num2) => {
  let x = parseInt(num1)
  let y = parseInt(num2)
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
    displayNumber = result; 
  }
  numberDisplay.innerText = displayNumber;
}

const inputNumber = (num) => {
  if(operator === "") {
    if(displayNumber == 0) {
      displayNumber = num;
    } else if(displayNumber === firstNumber) {
      displayNumber = num;
    } else {
      displayNumber += num;
    }
  } else {
    if(displayNumber === firstNumber) {
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
    firstNumber = result;
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

const clear = () => {
  displayNumber = 0;
  firstNumber = null;
  secondNumber = null;
  operator = "";
  result = null;
}

const backspace = () => {
  displayNumber = displayNumber.substr(0, displayNumber.length - 1);
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