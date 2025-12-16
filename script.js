const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".box");

let firstValue = "";
let operator = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {

    if (button.classList.contains("number") && button.value !== ".") {
      display.value += button.value;
    }
    
    if (button.value === ".") {
      if (!display.value.includes(".")) {
        display.value += ".";
      }
    }
    
    if (
      button.value === "+" ||
      button.value === "-" ||
      button.value === "*" ||
      button.value === "/"
    ) {
      if (display.value === "") return;

      firstValue = display.value;
      operator = button.value;
      display.value = "";
    }

    if (button.value === "=") {
      let secondValue = display.value;
      let result = 0;

      if (operator === "+") {
        result = Number(firstValue) + Number(secondValue);
      } else if (operator === "-") {
        result = Number(firstValue) - Number(secondValue);
      } else if (operator === "*") {
        result = Number(firstValue) * Number(secondValue);
      } else if (operator === "/") {
        if (Number(secondValue) === 0) {
          display.value = "Error";
          firstValue = "";
          operator = "";
          return;
        }
        result = Number(firstValue) / Number(secondValue);
      }

      display.value = result;
      firstValue = "";
      operator = "";
    }

    if (button.value === "clear") {
      display.value = "";
      firstValue = "";
      operator = "";
    }

    if (button.value === "del") {
      display.value = display.value.slice(0, -1);
    }

  });
});
