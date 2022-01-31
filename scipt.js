const numberDisplay = document.querySelector(".number-display");
const numBtn = document.querySelectorAll(".btn-numbers");
const operationBtn = document.querySelectorAll(".btn-operation");
const equalBtn = document.querySelector("#btn-equals");
const clearBtn = document.querySelector("#btn-clear");


let displayNumber = 0;
let number1 = null;
let number2 = null;
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
    } else if(displayNumber === number1) {
      displayNumber = num;
    } else {
      displayNumber += num;
    }
  } else {
    if(displayNumber === number1) {
      displayNumber = num;
    } else {
      displayNumber += num;
    }
  }
}

const inputOperation = (opVal) => {
  number1 = displayNumber;
  operator = opVal;
}

const inputEquals = () => {
  number2 = displayNumber;
  operate(operator, number1, number2);
  number2 = null;
  number1 = result;
  operator = "";
}

const clear = () => {
  displayNumber = 0;
  number1 = null;
  number2 = null;
  operator = "";
  result = null;
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

equalBtn.addEventListener("click", () => {
  inputEquals();
  updateDisplay();
});

clearBtn.addEventListener("click", () => {
  clear();
  updateDisplay();
})