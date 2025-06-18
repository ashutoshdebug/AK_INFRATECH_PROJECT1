document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".input-field");
  const buttons = document.querySelectorAll(".each-button");
  let currentInput = "";

  const updateDisplay = () => {
    display.textContent = currentInput
      .replace(/\*/g, "×")
      .replace(/\//g, "÷");
  };

  const calculate = () => {
    try {
      const result = eval(currentInput);
      currentInput = result.toString();
      updateDisplay();
    } catch (e) {
      currentInput = "Error";
      updateDisplay();
      setTimeout(() => {
        currentInput = "";
        updateDisplay();
      }, 1500);
    }
  };

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (value === "AC") {
        currentInput = "";
      } else if (value === "=") {
        calculate();
        return;
      } else if (value === "⌫") {
        currentInput = currentInput.slice(0, -1);
      } else if (value === "×") {
        currentInput += "*";
      } else if (value === "÷") {
        currentInput += "/";
      } else {
        currentInput += value;
      }

      updateDisplay();
    });
  });

  document.addEventListener("keydown", e => {
    const key = e.key;

    if (/\d/.test(key) || key === "." || key === "0") {
      currentInput += key;
    } else if (key === "+" || key === "-" || key === "*") {
      currentInput += key;
    } else if (key === "/") {
      currentInput += "/";
    } else if (key === "Enter") {
      calculate();
      return;
    } else if (key === "Backspace") {
      currentInput = currentInput.slice(0, -1);
    } else if (key === "Escape") {
      currentInput = "";
    }

    updateDisplay();
  });
});
