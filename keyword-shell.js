import { isWordInDictionary } from "./src/keywords";

const dictionary = new Map([
    ["if", false],
    ["else", false],
    ["while", false],
]);

let dictionaryList;
let wordInput;

const bootstrapApp = ({ listId, inputId }) => {
    dictionaryList = document.querySelector(listId);
    wordInput = document.querySelector(inputId);

    addListeners(wordInput);
    renderList(dictionaryList);
};

const renderList = (dictionaryListElement) => {
    dictionaryListElement.innerHTML = "";
    const list = document.createElement("ul");

    dictionaryListElement.appendChild(list);
    dictionary.forEach((isWordFound, word) => {
        const wordFoundElement = document.createElement("li");
        wordFoundElement.innerHTML = isWordFound ? word : "";
        list.appendChild(wordFoundElement);
    });
};

const handleChange = ({ value, target }) => {
    console.log({ value });
    if (!isWordInDictionary({ word: value, dictionary })) {
        return;
    }

    dictionary.set(value, true);
    target.value = "";
    renderList(dictionaryList);
};

const addListeners = (wordInputElement) => {
    wordInputElement.addEventListener("keyup", (event) =>
        handleChange({
            value: event.target.value,
            target: event.target,
        })
    );
};

const KeyWords = () => {};

bootstrapApp({
    listId: "#words-list",
    inputId: "#input-word",
});

const startTime = 5;
let timeLeft = startTime;

const clock = () => {
    return (timeLeft -= 1);
};

const interval = setInterval(() => {
    const currentClock = clock();
    const seconds = currentClock % 60;
    const minutes = currentClock / 60;
    document.querySelector("#time").innerText =
        Math.trunc(minutes) + ":" + seconds.toString().padStart(2, "0");

    if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
        document.querySelector(
            "#stop-text"
        ).innerHTML = `<p style="font-size: 10em;">STOP!</p>`;
        wordInput.disabled = true;
    }
}, 1000);

export { bootstrapApp, KeyWords };
