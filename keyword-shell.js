import { isWordInDictionary } from "./src/keywords";
import { Timer } from './src/timer';

const dictionary = new Map([
    ["if", false],
    ["else", false],
    ["while", false],
]);

let dictionaryList;
let wordInput;
let initialTimeLeft = 5;

let timer = new Timer({
    initialTimeLeft
});

const onDone = () => {
    document.querySelector(
        "#stop-text"
    ).innerHTML = `<p style="font-size: 10em;">STOP!</p>`;
    wordInput.disabled = true;
}

const onUpdate = ({ minutes, seconds }) => {
    document.querySelector("#time").innerText = minutes + ":" + seconds.toString().padStart(2, "0");
}

const bootstrapApp = ({ listId, inputId }) => {
    dictionaryList = document.querySelector(listId);
    wordInput = document.querySelector(inputId);

    addListeners(wordInput);
    renderList(dictionaryList);

    onUpdate(Timer.format(initialTimeLeft));

    timer
        .onDone(onDone)
        .onUpdate(onUpdate)
        .start();
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

bootstrapApp({
    listId: "#words-list",
    inputId: "#input-word",
});

export { bootstrapApp };
