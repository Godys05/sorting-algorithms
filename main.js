let nav = document.getElementsByClassName("sidebar")[0];
let sorts = document.querySelectorAll(".nav-link"); //the nav links
let sortsTexts = document.querySelectorAll(".nav-text");
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

let copy = [];

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

    while (chartElement.firstChild) chartElement.removeChild(chartElement.firstChild);
    console.log(chartElement);
    if (!inputBox.value) {
        dataLength = 2;
        inputBox.value = 2;
    }
    else if (parseInt(inputBox.value) < 2) {
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
    
    for (let i = 0; i < sorts.length; i++) {
        sorts[i].setAttribute("disabled", true);
        sortsTexts[i].setAttribute("disabled", true);
        sorts[i].classList.add("nav-link--disabled");
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
};

const createBar = (widthSize, id) => {
    let barElement = document.createElement('div');
    barElement.classList.add('card');
    barElement.style.height = "40vh";
    barElement.style.width = widthSize;
    barElement.style.display = "block";
    barElement.style.backgroundColor = "black";
    barElement.id = id;
    return barElement;
};

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
};

const attachBars = (parent, bars) => {
    for (let i = 0; i < bars.length; i++) {
        parent.appendChild(bars[i]);
    }
};

const attachRandomToBars = (elements, values) => {
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("value", `${values[i]}`);
    }
};

const updateBars = (elements) => {
    for (let i = 0; i < elements.length; i++) {
        const height = 0.1*parseInt(elements[i].getAttribute("value"));
        elements[i].style.height = `${height+50}px`;
    }
};

const startSorting = async (elements, selector) => {
    switch(selector) {
        case 0:
            await bubbleSort(elements);
            break;
        case 1:
            await modifiedBubbleSort(elements);
            break;
        case 2:
            await insertionSort(elements);
            break;
        case 3:
            await selectionSort(elements);
            break;
        case 4:
            await quickSort(elements);
            break;
        case 5:
            await finalMergeSort(elements);
            break;
        default:
            console.log('NO')
            await bubbleSort(elements);
    }

    for (let i = 0; i < sorts.length; i++) {
        sorts[i].setAttribute("disabled", false);
        sorts[i].classList.add("nav-link")
        sorts[i].classList.remove("nav-link--disabled");
    }

    inputBox.removeAttribute("disabled");
    setElementsButton.classList.remove("button--disabled");
    setElementsButton.removeAttribute("disabled");

    dataLength = 0; //size of the array
    unsortedData = []; //array where random data will be placed
    //bars = [] //bar div elements array
    copy = [];
    bars = [];

};

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
};

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
        flag = false;
    }
};

const insertionSort = async (elements) => {
    let key;
    for (let i = 0; i < elements.length; i++) {
        key = parseInt(elements[i].getAttribute("value"));
        elements[i].style.backgroundColor = "red";
        j = i-1;
        await wait(600);
        while (j >= 0 && key < parseInt(elements[j].getAttribute("value"))) {
            elements[j+1].setAttribute("value", elements[j].getAttribute("value"));
            if (j+1 === i) elements[j+1].style.backgroundColor = "red";
            else elements[j+1].style.backgroundColor = "blue"; 
            updateBars(elements);
            await wait(150);
            elements[j+1].style.backgroundColor = "black";
            j--;
        }
        elements[j+1].setAttribute("value", key);
        updateBars(elements);
        elements[j+1].style.backgroundColor = "green";
        await wait(300);
        elements[i].style.backgroundColor = "black";
        elements[j+1].style.backgroundColor = "black";
    }

    for (let i = 0; i < elements.length; i++) {
        console.log(elements[i].getAttribute("value"))
    }
};

const selectionSort = async(elements) => {
    for (let i = 0; i < elements.length; i++) {
        let min = i;
        elements[i].style.backgroundColor = "red";
        await wait(600)
        for (let j = i+1; j < elements.length; j++) {
            if (parseInt(elements[min].getAttribute("value")) > parseInt(elements[j].getAttribute("value"))) {
                if (min !== i) elements[min].style.backgroundColor = "black"
                min = j;
                elements[min].style.backgroundColor = "blue";
                await wait(300);
            }
        }

        let currentBar = parseInt(elements[i].getAttribute("value"));
        let minBar = parseInt(elements[min].getAttribute("value"));
        let temp = currentBar;

        elements[min].style.backgroundColor = "green";
        await wait(600);
        elements[i].setAttribute("value", minBar);
        elements[min].setAttribute("value", temp);
        updateBars(elements);
        await wait(600);
        elements[min].style.backgroundColor = "black";
        elements[i].style.backgroundColor = "black";
    }
};

const quickSort = async (elements) => {

    let low = 0;
    let high = elements.length-1;

    await processQuickSort(elements, low, high);

    for(let i = 0; i < elements.length; i++) {
        console.log(elements[i].getAttribute("value"));
    }

    updateBars(elements);
}

const processQuickSort = async (arr, low, high) => {
    
    if (arr.length == 1) return arr;

    if (low < high) {
        pi = await partition(arr, low, high);
        arr[pi].style.backgroundColor = "red";
        await wait(300);

        await processQuickSort(arr, low, pi-1);
        await processQuickSort(arr, pi+1, high);
        arr[pi].style.backgroundColor = "black";
    }
}

const partition = async (arr, low, high) => {
    let i = low-1;
    let pivot = parseInt(arr[high].getAttribute("value"));

    for (let j = low; j < high; j++) {
        if (parseInt(arr[j].getAttribute("value")) <= pivot) {
            i++;
            let temp = parseInt(arr[i].getAttribute("value"));
            arr[i].setAttribute("value", arr[j].getAttribute("value"))
            arr[j].setAttribute("value", temp);
            updateBars(arr);
            await wait(100);
        }
    }
    let temp = parseInt(arr[i+1].getAttribute("value"));
    arr[i+1].setAttribute("value", arr[high].getAttribute("value"))
    arr[high].setAttribute("value", temp);
    updateBars(100);
    await wait(100)
    return i+1;
}

const finalMergeSort = async(elements) => {
    copy = barsValues(elements);
    temp = await mergeSort(copy);
    console.log(temp);
}

const mergeSort = async(arr) =>{
    var sorted = [...arr],
        n = sorted.length,
        buffer = new Array(n);
  
    for (var size = 1; size < n; size *= 2) {
      for (var leftStart = 0; leftStart < n; leftStart += 2*size) {
        var left = leftStart,
            right = Math.min(left + size, n),
            leftLimit = right,
            rightLimit = Math.min(right + size, n),
            i = left;
        while (left < leftLimit && right < rightLimit) {
          if (sorted[left] <= sorted[right]) {
            buffer[i++] = sorted[left++];
          } else {
            buffer[i++] = sorted[right++];
          }
        }
        while (left < leftLimit) {
          buffer[i++] = sorted[left++];
        }
        while (right < rightLimit) {
          buffer[i++] = sorted[right++];
        }
      }
      var temp = sorted,
          sorted = buffer,
          buffer = temp;
          for (let i = 0; i < sorted.length; i++) {
              bars[i].setAttribute("value", sorted[i]);
              updateBars(bars);
              await wait(100);
          }
    }
  
    return sorted;
  }
  

const barsValues = (elements) => {
    let values = [];
    for (let i = 0; i < elements.length; i++) {
        values.push(parseInt(elements[i].getAttribute("value")));
    }
    return values;
}