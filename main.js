let nav = document.getElementsByClassName("sidebar")[0];
let sorts = document.getElementsByClassName("nav-link"); //the nav links
let inputBox = document.getElementById("input"); //input where you place the number of elements to be sorted
let shuffleButton = document.getElementById("shuffleButton"); //button to randomize data
let beginButton = document.getElementById("beginButton"); //button to start the sorting
let setElementsButton = document.getElementById("setElementsButton"); //button to set the number of elements to be sorted
let chartElement = document.getElementById("chart");

let selectedSort = 0; //selector that will determine which sorting algorithm will be used
let currentSortName = document.getElementById("sortName"); //the header of the sorting algorithm to be used
let dataLength = 0; //size of the array
let unsortedData = []; //array where random data will be placed
let bars = [] //bar div elements array

//click event handler for nav
document.addEventListener('click', (event) => {
    if (!event.target.matches('.nav-link') && !event.target.matches('.nav-text')) return;
    event.preventDefault();

    selectedSort = parseInt(event.target.getAttribute("value"));

    //if clicked on the div
    if (event.target.matches('.nav-link')) {
        currentSortName.innerHTML = event.target.querySelector('p').innerHTML
    }
    else {
        currentSortName.innerHTML = event.target.innerHTML
    }
});

//click handler for setData button
document.addEventListener('click', (event) => {
    if (!event.target.matches('.setInput')) return;

    if (!inputBox.value) {
        dataLength = 2;
        inputBox.value = 2;
    }
    else {
        dataLength = parseInt(inputBox.value);
    }

    setElementsButton.classList.add("button--disabled");
    setElementsButton.setAttribute("disabled", true);

    inputBox.setAttribute("disabled", true);

    shuffleButton.classList.remove("button--disabled");
    shuffleButton.removeAttribute("disabled");


    chartElement.style.display = "flex";

    bars = createBars(dataLength);
    attachBars(chartElement, bars);

});

//shuffle Data
document.addEventListener('click', (event) => {
    if (event.target.id != "shuffleButton") return;

    shuffleButton.setAttribute("disabled", true);
    shuffleButton.classList.add("button--disabled");

    beginButton.removeAttribute("disabled");
    beginButton.classList.remove("button-accent--disabled");
    beginButton.classList.add("button-accent");

    unsortedData = setRandomdata(dataLength);
    attachRandomToBars(bars, unsortedData);
    updateBars(bars);
});

//Start sorting
document.addEventListener('click', (event) => {
    if (event.target.id != "beginButton") return;

    beginButton.setAttribute("disabled", true);
    beginButton.classList.add("button-accent--disabled");
    beginButton.classList.remove("button-accent");
    nav.setAttribute("disabled", true);

    for (let i = 0; i < sorts.length; i++) {
        sorts[i].setAttribute("disabled", true);
        sorts[i].classList.add("nav-link--disabled")
        sorts[i].classList.remove("nav-link");
    }

    //START PROCESS
    startSorting(bars, selectedSort);
});

const setRandomdata = (inputSize) => {
    let data = [];

    for (let i = 0; i < inputSize; i++) {
        let number = Math.random() * 1000;
        number = Math.floor(number);
        data.push(number);
    }

    return data;
}

const createBar = (widthSize, id) => {
    let barElement = document.createElement('div');
    barElement.classList.add('card');
    barElement.style.height = "40vh";
    barElement.style.width = widthSize;
    barElement.style.display = "block";
    barElement.style.backgroundColor = "black";
    barElement.id = id;
    return barElement;
}

const createBars = (inputSize) => {
    let bars = [];
    let widthPerBar = 100/inputSize;

    let id = 0;

    widthPerBar = `${widthPerBar}rem`;
    for (let i = 0; i < inputSize; i++) {
        id = `bar${i}`;
        bars.push(createBar(widthPerBar, id));
    }

    return bars;
}

const attachBars = (parent, bars) => {
    for (let i = 0; i < bars.length; i++) {
        parent.appendChild(bars[i]);
    }
}

const attachRandomToBars = (elements, values) => {
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("value", `${values[i]}`);
    }
}

const updateBars = (elements) => {
    for (let i = 0; i < elements.length; i++) {
        const height = 0.1*parseInt(elements[i].getAttribute("value"));
        elements[i].style.height = `${height+50}px`;
    }
}

const startSorting = async (elements, selector) => {
    console.log(selector);
    switch(selector) {
        case 0:
            bubbleSort(elements);
            break;
        case 1:
            modifiedBubbleSort(elements);
            break;
        default:
            bubbleSort(elements);
    }
}

const wait = async(ms) => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
};

const bubbleSort = async (elements) => {
    for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < elements.length - i - 1; j++) {
            let firstValue = parseInt(elements[j].getAttribute("value"));
            let secondValue = parseInt(elements[j+1].getAttribute("value"));
            elements[j].style.backgroundColor = "red";
            elements[j+1].style.backgroundColor = "red";

            await wait(200);
            
            if (firstValue > secondValue) {
                elements[j].setAttribute("value", secondValue);
                elements[j+1].setAttribute("value", firstValue)
                updateBars(elements);
            }

            await wait(200)

            elements[j].style.backgroundColor = "black";
            elements[j+1].style.backgroundColor = "black";
            
            await wait(200)
        }
    }
}

const modifiedBubbleSort = async (elements) => {
    let flag = false;
    for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < elements.length - i - 1; j++) {
            let firstValue = parseInt(elements[j].getAttribute("value"));
            let secondValue = parseInt(elements[j+1].getAttribute("value"));
            elements[j].style.backgroundColor = "red";
            elements[j+1].style.backgroundColor = "red";

            await wait(200);
            
            if (firstValue > secondValue) {
                elements[j].setAttribute("value", secondValue);
                elements[j+1].setAttribute("value", firstValue)
                updateBars(elements);
                flag = true
            }

            await wait(200)

            elements[j].style.backgroundColor = "black";
            elements[j+1].style.backgroundColor = "black";
            
            await wait(200)

        }
        if (!flag) break;
    }
}