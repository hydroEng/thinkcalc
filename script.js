display = document.querySelector("#display")

let a
let b
let operator

let operators = ['*', '–', '/', '+']
let clearAns = false
let alwaysClearAns = false
let allowDot = true

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    if (b==0) {
        alwaysClearAns = true
        return "ZERO DIV ERR"
    }
    return a / b
}

function roundFloat(a) {
    let ans = a
    if (String(a).includes(".")) {
        ans = ans.toFixed(2)
    }
    return ans
}

function occursTwice(string, char) {
    count = 0
    for (let i=0; i<string.length; i++) {
        currentChar = string[i]
        if (currentChar == char) {
            count += 1
        }
    }
    if (count < 2) {
        return false
    }

    return true
}
function operate(a, b, operator) {

    let ans

    if (operator === "+") {
        ans = add(a, b)
    }
    else if (operator === "–") {
        ans =  subtract(a, b)
    }
    else if (operator === "*") {
        ans =  multiply(a, b)
    }
    else if (operator === "/") {
        ans =  divide(a, b)
    }

    return roundFloat(ans)
}

function parse(string) {

    let splitter
    for (i=0; i < string.length; i++) {
        if (operators.includes(string[i])) {
            splitter = string[i]
        }
    }

    parsedArray = string.split(splitter)

    if (parsedArray.length == 1) {
        return "ERROR"
    }
    a = Number(parsedArray[0])
    b = Number(parsedArray[1])
    
    display.innerHTML = operate(a, b, splitter)
    clearAns = true
}

function carryAnswer() {
    let currentDisplay = display.innerHTML
    for (i=0; i < currentDisplay.length; i++) {
        if (operators.includes(char)) {
            parse(currentDisplay)
        }
    }
        
} 
function updateDisplay(e) {

    char = e.target.innerHTML
    if (operators.includes(char)) {
        carryAnswer()
        allowDot = true
    }
    if (clearAns) {
        if (!operators.includes(char)) {
            display.innerHTML = ""
        }
        clearAns = false
    }
    if (alwaysClearAns) {
        display.innerHTML = ""
        alwaysClearAns = false
    }

    if (char !== '.' || allowDot == true) {
        display.innerHTML += char
    }

    if (char == '.') {
        allowDot = false
    }
    
}



// Attach functions to buttons

inputButtons = document.querySelectorAll(".d ")

for (let i=0; i<inputButtons.length; i++) {
    inputButtons[i].addEventListener("click", updateDisplay)
}

clear = document.querySelector(".cls")
clear.addEventListener("click", (e) => {
    display.innerHTML = ""
    allowDot = true
})

ok = document.querySelector("#ok")
ok.addEventListener("click", () => {
    parse(display.innerHTML)
})

operatorButtons = document.querySelector(".operator")

