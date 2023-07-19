const btnPlayRef = document.querySelector("#playBtn");
const inputRefs = [...document.querySelectorAll('input[id^="digit"]')];
// pokazywalo ze to Node list, musilismy dodac [...document] stworzylismy tabilice

// walidacja ponizej
// wyrazenia funkcyjne, aby nadac reuzywalnosc kodu
const isAllNotEmpty = (nodes) => nodes.every((node) => node.value.trim() !== "");
// wyciaganie wartosci z inputa to value

const isIntegers = (nodes) => nodes.every((node) => Number.isInteger(Number(node.value)));
// nodes to inputy, node to 1 input, node.value to wartosc z tego inputa

// konwertuje wsztskie outputy z inpota ktre sa stringami aby byly liczbami, ma zwrocic tablice  zliczbami
const convertToIntegers = (nodes) => nodes.map((note) => parseInt(note.value));
// number tez by zadzialalo

// tablica przyjmuja tablice liczb i spr czy sa w zakresie 1 -49
const isInRange = (digits) => digits.every((digit => digit >= 1 && digit <= 49));
// liczby maja sie nie powtarzac
const isNotRedundant = (digits) => new Set(digits).size === digits.length;
// tworzymy nowy set unikalnych liczb, jesli dajemy 6 ale 3 sie powtarzaja, set usuwa dupliakty i pozostana 3 liczby,
// size spr ile pozostalo liczby i jest przyrownywany do liczb wyjsciowych wporwadzonych, stad wiemy czy zostaly jakies usuniete czy nie


// walidacja ponizej
btnPlayRef.addEventListener("click", function (event) {
    if (isAllNotEmpty(inputRefs)) {
        if (isIntegers(inputRefs)) {
            // wczesniej mielismy to: console.log("ok");
            const userDigits = convertToIntegers(inputRefs);
            if (isInRange(userDigits)) {
                if (isNotRedundant(userDigits)) {

                } else {
                    console.log("liczby ci się powtarzają ziomeczku")
                }
            } else {
                console.log("są liczby poza zakresem 1-49");
            }
        } else {
            console.log("liczby nie są liczbami")
        }
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


