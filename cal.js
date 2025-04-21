const display = document.getElementById("display");
const buttons = document.getElementsByTagName("button");

let currentInput = "0";
let previousInput = "";
let operator = "";
let justEvaluated = false;

const acceptedKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "/",
  "%",
  "*",
  ".",
  "Enter",
  "Backspace",
];

for (i = 0; i < buttons.length; i++) {
  const button = buttons[i];
  button.addEventListener("click", function () {
    const value = button.textContent;
    handleValueEvent(value);
  });
}

function handleValueEvent(value) {
  switch (value) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":

      if (currentInput === "0" || justEvaluated) {
        currentInput = value;
      } else {
        currentInput += value;
        justEvaluated = false;
      }
      updateDisplay();
      break;

    case "AC":
      currentInput = "0";
      previousInput = "";
      operator = "";
      updateDisplay();
      break;

    case "=":
      if (!currentInput || !previousInput || !operator) {
        return;
      }
      calculate();
      updateDisplay();
      previousInput = "";
      operator = "";
      justEvaluated = true;
      break;

    case ".":
      if (!currentInput.includes(".")) {
        currentInput += value;
        updateDisplay();
      }
      break;

    case "+":
    case "-":
    case "÷":
    case "x":
      calculateOrReAssign(value);
      break;

    case "+/-":
      currentInput = String(-parseFloat(currentInput)).toString();
      updateDisplay();
      break;

    case "%":
      currentInput = String(parseFloat(currentInput / 100));
      updateDisplay();
      break;
  }
}
document.addEventListener("keydown", function (event) {
  let currentPressedKey = event.key;
  if (acceptedKeys.includes(currentPressedKey)) {
    if (currentPressedKey === "Enter") {
      currentPressedKey = "=";
    }
    if (currentPressedKey === "*") {
      currentPressedKey = "x";
    }
    if (currentPressedKey === "/") {
      currentPressedKey = "÷";
    }
    if (currentPressedKey === "Backspace") {
      currentPressedKey = "AC";
    }
    handleValueEvent(currentPressedKey);
  }
});

function calculateOrReAssign(value) {
  if (operator && previousInput) {
    calculate();
  }

  operator = value === "x" ? "*" : value === "÷" ? "/" : value;
  previousInput = currentInput;
  currentInput = "0";
}

function calculate() {
  try {
    const result = eval(
      `${parseFloat(previousInput)} ${operator}${parseFloat(currentInput)}`
    );
    currentInput = String(Math.round(result * 1e10) / 1e10);
  } catch (e) {
    currentInput = "Error";
  }
}



function updateDisplay() {
  display.value = currentInput;
}
