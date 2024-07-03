document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            handleButtonClick(button);
        });
    });

    document.addEventListener('keydown', function (event) {
        handleKeyPress(event.key);
    });

    function handleButtonClick(button) {
        if (button.id === 'clear') {
            clearAll();
        } else if (button.id === 'backspace') {
            backspace();
        } else if (button.id === 'equals') {
            calculateResult();
        } else if (button.dataset.operator) {
            handleOperator(button.dataset.operator);
        } else {
            handleNumber(button.dataset.number);
        }
    }

    function handleKeyPress(key) {
        if (key === 'Enter') {
            calculateResult();
        } else if (key === 'Backspace') {
            backspace();
        } else if ('0123456789.'.includes(key)) {
            handleNumber(key);
        } else if ('+-*/%'.includes(key)) {
            handleOperator(key);
        } else if (key === 'Escape') {
            clearAll();
        }
    }

    function clearAll() {
        currentInput = '';
        operator = '';
        firstOperand = '';
        secondOperand = '';
        display.innerText = '0';
    }

    function backspace() {
        if (currentInput !== '') {
            currentInput = currentInput.slice(0, -1);
            display.innerText = currentInput || '0';
        }
    }

    function handleNumber(number) {
        currentInput += number;
        display.innerText = currentInput;
    }

    function handleOperator(op) {
        if (currentInput !== '') {
            if (firstOperand === '') {
                firstOperand = currentInput;
                currentInput = '';
            }
            operator = op;
        }
    }

    function calculateResult() {
        if (firstOperand !== '' && operator !== '' && currentInput !== '') {
            secondOperand = currentInput;
            const result = calculate(firstOperand, secondOperand, operator);
            display.innerText = result;
            currentInput = result;
            firstOperand = '';
            operator = '';
            secondOperand = '';
        }
    }

    function calculate(firstOperand, secondOperand, operator) {
        firstOperand = parseFloat(firstOperand);
        secondOperand = parseFloat(secondOperand);
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            case '%':
                return firstOperand % secondOperand;
            case '**2':
                return Math.pow(firstOperand, 2);
            default:
                return secondOperand;
        }
    }
});
