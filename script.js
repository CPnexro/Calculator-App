const displayText = document.getElementById("displayText");
const nexroImg = document.getElementById("nexroImg");
const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");

let expression = "";
let displayValue = "";

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
renderHistory();

function append(val) {
  hideNexro();

  if (['+', '-', '*', '/', '%'].includes(val)) {
    expression += val;
    displayValue += (val === '*') ? '×' : (val === '/') ? '÷' : val;
    displayText.innerText = displayValue;
    return;
  }

  let parts = expression.split(/[\+\-\*\/%]/);
  let last = parts[parts.length - 1];

  if (last === "0" && val !== ".") {
    expression = expression.slice(0, -1) + val;
    displayValue = displayValue.slice(0, -1) + val;
  } else {
    expression += val;
    displayValue += val;
  }

  displayText.innerText = displayValue || "0";
}

function clearAll() {
  expression = "";
  displayValue = "";
  displayText.innerText = "0";
  hideNexro();
}

function backspace() {
  hideNexro();
  expression = expression.slice(0, -1);
  displayValue = displayValue.slice(0, -1);
  displayText.innerText = displayValue || "0";
}

function toggleSign() {
  if (!expression) return;
  expression = (parseFloat(expression) * -1).toString();
  displayValue = expression;
  displayText.innerText = displayValue;
}

function calculate() {
  if (expression === "0") {
    showNexro();
    return;
  }

  try {
    const result = eval(expression);
    saveHistory(`${displayValue} = ${result}`);
    expression = result.toString();
    displayValue = expression;
    displayText.innerText = displayValue;
  } catch {
    displayText.innerText = "Error";
  }
}

function showNexro() {
  displayText.style.display = "none";
  nexroImg.style.display = "block";


  nexroImg.classList.remove("nexro-animate");
  void nexroImg.offsetWidth;
  nexroImg.classList.add("nexro-animate");
}

function hideNexro() {
  displayText.style.display = "block";
  nexroImg.style.display = "none";
  nexroImg.classList.remove("nexro-animate");
}

function toggleHistory() {
  historyPanel.style.display =
    historyPanel.style.display === "block" ? "none" : "block";
}

function saveHistory(entry) {
  history.unshift(entry);
  history = history.slice(0, 30);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(h => {
    const li = document.createElement("li");
    li.innerText = h;
    historyList.appendChild(li);
  });
}
