document.addEventListener("DOMContentLoaded", () => {
  const calculator = document.querySelector(".calculator");
  const keys = calculator.querySelector(".calculator__keys");
  const display = document.querySelector(".display");

  const calculate = (n1, operator, n2) => {
    let result = "";
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);
    if (operator === "add") {
      result = n1 + n2;
    } else if (operator === "subtract") {
      result = n1 - n2;
    } else if (operator === "multiply") {
      result = n1 * n2;
    } else if (operator === "divide") {
      result = n1 / n2;
    }
    return result;
  };

  keys.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      console.log("clicked");
      const key = e.target;
      const action = key.dataset.action;
      const keyContent = key.textContent;
      const displayedNum = display.textContent;
      const previousKeyType = calculator.dataset.previousKeyType;

      if (
        action === "add" ||
        action === "subtract" ||
        action === "multiply" ||
        action === "divide" ||
        action === "percent"
      ) {
        // Operator key
        console.log("operator");
        calculator.dataset.firstValue = displayedNum;
        calculator.dataset.operator = action;
        calculator.dataset.previousKeyType = "operator";
        key.classList.add("is-depressed");
      }

      if (action === "decimal") {
        // Decimal key
        console.log("decimal");
        if (!displayedNum.includes(".")) {
          display.textContent = displayedNum + ".";
        } else if (previousKeyType === "operator") {
          display.textContent = "0.";
        }
        calculator.dataset.previousKeyType = "decimal";
      }

      if (action === "clear") {
        // Clear key: Clears the current entry
        console.log("clear current number");
        // Clear key: Removes the last digit from the current entry
        console.log("clear last digit");
        display.textContent = displayedNum.slice(0, -1) || "0";
        calculator.dataset.previousKeyType = "clear";
      }

      if (action === "ac") {
        // All Clear key: Resets the entire calculator
        console.log("all clear");
        display.textContent = "0";
        calculator.dataset.firstValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      }

      if(action === "percent"){
        console.log("percent");
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;

        if(firstValue && operator){
          display.textContent = calculate(firstValue,'divide', 100)
        }

      }
      if (action === "calculate") {
        // Calculate key
        console.log("equal");
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        if (firstValue && operator) {
          display.textContent = calculate(firstValue, operator, secondValue);
        }
        calculator.dataset.previousKeyType = "calculate";
      }

      if (!action) {
        // Number key
        if (displayedNum === "0" || previousKeyType === "operator") {
          display.textContent = keyContent;
        } else {
          display.textContent = displayedNum + keyContent;
        }
        calculator.dataset.previousKeyType = "number";
      }

      Array.from(key.parentNode.children).forEach((k) =>
        k.classList.remove("is-depressed")
      );
    }
  });
});
