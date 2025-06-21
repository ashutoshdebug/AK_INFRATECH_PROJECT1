document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".input-field");
  const buttons = document.querySelectorAll(".each-button");
  let currentInput = "";
  let errorShown = false;

  const updateDisplay = () => {
    display.textContent = currentInput
      .replace(/\*/g, "×")
      .replace(/\//g, "÷");
  };

  const showError = () => {
    display.textContent = "Error";
    errorShown = true;
    setTimeout(() => {
      currentInput = "0";
      updateDisplay();
      errorShown = false;
    }, 1500);
  };

  const calculate = () => {
    try {
      const sanitized = currentInput.replace(/×/g, "*").replace(/÷/g, "/");
      const result = math.evaluate(sanitized);
      currentInput = result.toString();
      updateDisplay();
    } catch (e) {
      showError();
    }
  };

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      if (errorShown) return;

      const value = button.textContent;

      if (value === "AC") {
        currentInput = "0";
      } else if (value === "=") {
        calculate();
        return;
      } else if (value === "⌫") {
        currentInput = currentInput.length > 1
          ? currentInput.slice(0, -1)
          : "0";
      } else {
        if (currentInput === "0" && /[\d.]/.test(value)) {
          currentInput = value;
        } else {
          currentInput += (value === "×") ? "*" :
                          (value === "÷") ? "/" : value;
        }
      }

      updateDisplay();
    });
  });

  document.addEventListener("keydown", e => {
    if (errorShown) return;

    const key = e.key;

    if (/\d/.test(key) || key === ".") {
      currentInput = currentInput === "0" ? key : currentInput + key;
    } else if (["+", "-", "*", "/"].includes(key)) {
      currentInput += key;
    } else if (key === "Enter") {
      e.preventDefault();
      calculate();
      return;
    } else if (key === "Backspace") {
      currentInput = currentInput.length > 1
        ? currentInput.slice(0, -1)
        : "0";
    } else if (key === "Escape") {
      currentInput = "0";
    }

    updateDisplay();
  });

  // Initialize
  currentInput = "0";
  updateDisplay();
});
