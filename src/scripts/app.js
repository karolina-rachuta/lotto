const btnPlayRef = document.querySelector("#playBtn");
const inputRefs = [...document.querySelectorAll('input[id^="digit"]')];
// pokazywalo ze to Node list, musilismy dodac [...document] stworzylismy tabilice
const resultsRef = document.querySelector(".result");

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

// Wylosowć 6 liczb z zakresu 1-49 bez powtórzeń i zwrocic tablice
// stworz pusta tablice do ktorej dodasz wylosowane liczby
// napisz petle, ktora wykona sie tyle raz aby osiagnac 6 liczb bez powtorzen
// wylosuj liczbe z zakresu
// sprawdz czy liczba juz byla, jesli tak losuj ponownie, jeslei nie to ja dodaj do tablicy
// zwroc tablice z wylosowanymi liczbami
const drawDigits = () => {
    const numbers = [];
    while (numbers.length < 6) {
        const result = Math.round(Math.random() * 48 + 1);
        if (!numbers.includes(result)) {
            numbers.push(result);
        }
    }
    return numbers;
}

// 3. sprawdz ilosc trafien
//     stworz tablice do ktorej zapiszesz trafienia
//     zrob petle po wszystkich elementach jednej tablicy
//     sprawdz czy element istnieje w drugiej tablicy
//     jak tak to dodaj do tablicy z trafieniami
//     zwroc tablice z trafieniami

const checkHits = (userDigits, drawnDigits) => {
    const hits = [];
    for (const digit of userDigits) {
        if (drawnDigits.includes(digit)) {
            hits.push(digit)
        }
    }
    return hits;
}
//  inne opcje:
// const checkHits = (userDigits, drawnDigits) => {
//     const hits = [];
//
//     userDigits.forEach((digit) => {
//         if (drawnDigits.includes(digit)) {
//             hits.push(digit);
//         }
//     })
//
//     return hits;
// }
//
// const checkHitsPro = (userDigits, drawnDigits) => userDigits.filter((digit) => drawnDigits.includes(digit));

const calculatePrize = (quantity) => {
    switch (quantity) {
        case 3:
            return 24;
        case 4:
            return 170;
        case 5:
            return 3500;
        case 6:
            return 3000000;
        default:
            return 0
    }
};

const showResults = (hits, drawnDigits) => {
    let message = `Wylosowane liczby to: ${drawnDigits.join(", ")}. `;
    if (hits.length > 0) {
        message += `Trafiłeś ${hits.length}, Twoje liczby to: ${hits.join(". ")}. `
        message += `Hajs: ${calculatePrize(hits.length)} PLN.`
    } else {
        message += `Nic nie wygrałeś, spróbuj jeszcze raz, a na pewno wygrasz!`
    }
resultsRef.innerText = message;
}
//  to oznacza ze ten tekst w messege pojawi sie fizycznie w html

// walidacja co prowadzil uzytkownik ponizej
btnPlayRef.addEventListener("click", function (event) {
    if (isAllNotEmpty(inputRefs)) {
        if (isIntegers(inputRefs)) {
            // wczesniej mielismy to: console.log("ok");
            const userDigits = convertToIntegers(inputRefs);
            if (isInRange(userDigits)) {
                if (isNotRedundant(userDigits)) {
                    const drawnDigits = drawDigits();
                    const hits = checkHits(userDigits, drawnDigits);
                    showResults(hits, drawnDigits);
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


function becomeMillionaire(money, digits) {
    const games = money / 3;
    let prize = 0;
    const count6 = [];

    for (let i = 0; i < games; i++) {
        let userDigits;
        if (digits === undefined) {
            userDigits = drawDigits();
        } else {
            userDigits = digits;
        }

        const drawnDigits = drawDigits();
        const hits = checkHits(userDigits, drawnDigits);
        prize += calculatePrize(hits.length)

        if (hits.length === 6) {
            count6.push(hits);
        }
    }

    return `Wygrałeś ${prize}PLN, szóstki: ${count6.length}, trafione numery do szóstki: ${count6.join(', ')}`
}