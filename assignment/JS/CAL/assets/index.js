const calculatorDisplay = document.getElementById("display");
const calculatorButtons = document.querySelectorAll(".button");

function handleButtonClick(value) {
    switch (value) {
        case "AC":
            calculatorDisplay.value = "";
            break;
        case "DE":
            calculatorDisplay.value = calculatorDisplay.value.slice(0, -1);
            break;
        case "=":
            try {
                calculatorDisplay.value = eval(calculatorDisplay.value);
            } catch {
                alert("Error!");
                calculatorDisplay.value = "";
            }
            break;
        default:
            calculatorDisplay.value += value;
    }
}

calculatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        handleButtonClick(button.value);
    });

    button.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleButtonClick("=");
        } else if (e.key === "Backspace") {
            handleButtonClick("DE");
        } else if (!isNaN(e.key)) {
            handleButtonClick(e.key);
        }
    });
});

document.getElementById("display").focus();
