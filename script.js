let displayText = document.getElementById("displayText");
let nexroImg = document.getElementById("nexroImg");
let historyPanel = document.getElementById("historyPanel");
let historyList = document.getElementById("historyList");

let expression = "";      
let displayValue = "";   

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
renderHistory();

function append(val) {
  hideNexro();

  if (val === '*') {
    expression += '*';
    displayValue += '×';
  } else if (val === '/') {
    expression += '/';
    displayValue += '÷';
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
    let result = eval(expression);
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
}

function hideNexro() {
  displayText.style.display = "block";
  nexroImg.style.display = "none";
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
    let li = document.createElement("li");
    li.innerText = h;
    historyList.appendChild(li);
  });
}
