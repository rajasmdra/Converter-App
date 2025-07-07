let mode = "";

function showHome() {
    document.querySelector(".home").style.display = "flex";
    document.querySelector(".bar").style.display = "none";
    
}
function showTemperature() {
    mode = "temp";
    document.querySelector(".bar h1").innerHTML = "Temperature Converter";
    document.querySelectorAll(".bar, .tempUnit").forEach(el => {
    el.style.display = "flex";
    });
    document.querySelectorAll(".home, .lengthUnit, .massUnit, .timeUnit").forEach(el => {
    el.style.display = "none";
    });
}
function showLength() {
    mode = "length";
    document.querySelector(".bar h1").innerHTML = "Length Converter";
    document.querySelectorAll(".bar, .lengthUnit").forEach(el => {
        el.style.display = "flex";
    });
    document.querySelectorAll(".home, .tempUnit, .massUnit, .timeUnit").forEach(el => {
        el.style.display = "none";
    });
}
function showMass() {
    mode = "mass";
    document.querySelector(".bar h1").innerHTML = "Mass Converter";
    document.querySelectorAll(".bar, .massUnit").forEach(el => {
        el.style.display = "flex";
    });
    document.querySelectorAll(".home, .tempUnit, .lengthUnit, .timeUnit").forEach(el => {
        el.style.display = "none";
    });
}
function showTime() {
    mode = "time";
    document.querySelector(".bar h1").innerHTML = "Time Converter";
    document.querySelectorAll(".bar, .timeUnit").forEach(el => {
        el.style.display = "flex";
    });
    document.querySelectorAll(".home, .tempUnit, .lengthUnit, .massUnit").forEach(el => {
        el.style.display = "none";
    });
}

function convert() {
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const unitBefore = document.querySelector(`.${mode}Unit .unitBefore`).value;
    const unitAfter = document.querySelector(`.${mode}Unit .unitAfter`).value;

    let result = 0;
    
    if (isNaN(inputValue) || unitBefore === "" || unitAfter === "") {
        document.getElementById("result").innerHTML = "Not valid";
        return;
    }
    
    if (mode === "temp") {
        let celcius = 0;

        if (unitBefore === 'c') {
            celcius = inputValue;
        } 
        else if (unitBefore === 'r') {
            celcius = 5.0/4.0 * inputValue;
        }
        else if (unitBefore === 'f') {
            celcius =  5.0/9.0 * (inputValue - 32);
        } 
        else if (unitBefore === 'k') {
            celcius = inputValue - 273.15;
        }
    
        if (unitAfter === 'c') {
            result = celcius;
        } else if (unitAfter === 'r') {
            result = 4.0/5.0 * celcius;
        } else if (unitAfter === 'f') {
            result = (9.0/5.0 * celcius) + 32;
        } else if (unitAfter === 'k') {
            result = celcius + 273.15;
        }
    } 
    else if (mode === "length") {
        const unitArray = ["mm", "cm", "dm", "m", "dam", "hm", "km"];
        const indexBefore = unitArray.indexOf(unitBefore);
        const indexAfter = unitArray.indexOf(unitAfter);

        result = inputValue * Math.pow(10, indexBefore - indexAfter);
    } 
    else if (mode === "mass") {
        const unitArray = ["mg", "cg", "dg", "g", "dag", "hg", "kg"];
        const indexBefore = unitArray.indexOf(unitBefore);
        const indexAfter = unitArray.indexOf(unitAfter);

        result = inputValue * Math.pow(10, indexBefore - indexAfter);
    }
    else if (mode === "time") {
        const unitArray = [["s", "min", "h", "d", "m", "y"], 
            [1000, 
            60 * 1000, 
            60 * 60 * 1000, 
            24 * 60 * 60 * 1000, 
            30 * 24 * 60 * 60 * 1000, 
            365 * 24 * 60 * 60 * 1000]]

        const indexBefore = unitArray[0].indexOf(unitBefore);
        const indexAfter = unitArray[0].indexOf(unitAfter);

        result = (inputValue * unitArray[1][indexBefore]) / unitArray[1][indexAfter];
    }

    document.getElementById("result").innerHTML = result.toFixed(2);
}

const hamburger = document.querySelector(".fa-bars"); 
const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

hamburger.addEventListener('click', () => {
    menu.classList.toggle('show');
    nav.classList.toggle('show');
});