const btnPlayRef = document.querySelector("#playBtn");
const inputRefs = [...document.querySelectorAll('input[id^="digit"]')];

// mamy tabilice dodalismy [...]

const isAllNotEmpty = (nodes) => nodes.every((node) => node.value.trim() !== "");
// wyciaganie wartosci z inputa to value

const isIntegers = (nodes) => nodes.every((node) => Number.isInteger(Number(node.value)));
// nodes to inputy, node to 1 input, node.value to wartosc z tego inputa
btnPlayRef.addEventListener("click", function(event){
    if (isAllNotEmpty(inputRefs)){
    console.log("ok")
    } else {
        console.log("coś jest puste")
    }
})

//powyzej deklaracja funcji, dopiero jak ktos wcisnie guzik jest wywolana, uzywamy callback
//event obiekt zdarzenia - event

// btnPlayRef.addEventListener("click", (event) =>
//     (console.log(this);)
// )
// w tym miejscu bedzie this = w> window bo nie ma kontekstu


