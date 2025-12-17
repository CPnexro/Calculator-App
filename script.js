const expression = document.querySelector(".expression");
const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".box");

let current = "";
let firstValue = "";
let operator = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.value;

    if (button.classList.contains("number")) {
      if (value === "." && current.includes(".")) return;
      current += value;
      result.innerText = current;
    }
    
    if (button.classList.contains("operator")) {
      
      if (value === "clear") {
        current = firstValue = operator = "";
        expression.innerText = "";
        result.innerText = "0";
        return;
      }
      
      if (value === "del") {
        current = current.slice(0, -1);
        result.innerText = current || "0";
        return;
      }
      
      if (value === "=") {
        if (!firstValue || !current) return;
        
        let calc;
        if (operator === "+") calc = +firstValue + +current;
        if (operator === "-") calc = firstValue - current;
        if (operator === "×") calc = firstValue * current;
        if (operator === "÷") {
          if (current === "0") {
            result.innerText = "Error bro";
            return;
          }
          calc = firstValue / current;
        }
        expression.innerText = `${firstValue} ${operator} ${current}`;
        result.innerText = calc;
        current = calc.toString();
        firstValue = "";
        operator = "";
        return;
      }
      if (current === "") return;
      firstValue = current;
      operator = value;
      expression.innerText = `${firstValue} ${operator}`;
      current = "";
    }
  });
});
    
    
