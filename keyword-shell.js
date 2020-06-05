import { KeyWordShell } from "./src/keywords";
import { Timer } from "./src/timer";

const dictionary = new Map([
    ["if", false],
    ["else", false],
    ["while", false],
]);

const doneInnerHTML = `<p style="font-size: 10em;">STOP!</p>`;

let dictionaryList;
let wordInput;
let startButton;
let resetButton;
let stopText;
let scoreElement;
let initialTimeLeft = 5;

let timer = new Timer({
    initialTimeLeft,
});

const onDone = () => {
    stopText.innerHTML = doneInnerHTML;
    wordInput.disabled = true;
};

const onUpdate = ({ minutes, seconds }) => {
    document.querySelector("#time").innerText =
        minutes + ":" + seconds.toString().padStart(2, "0");
};

const bootstrapApp = ({
    listId,
    inputId,
    startButtonId,
    resetButtonId,
    stopTextId,
    scoreId,
}) => {
    dictionaryList = document.querySelector(listId);
    wordInput = document.querySelector(inputId);
    startButton = document.querySelector(startButtonId);
    resetButton = document.querySelector(resetButtonId);
    stopText = document.querySelector(stopTextId);
    scoreElement = document.querySelector(scoreId);
    addListeners(wordInput);
    renderList(dictionaryList);

    onUpdate(Timer.format(initialTimeLeft));

    timer.onDone(onDone).onUpdate(onUpdate);
    wordInput.disabled = true;
    updateScoreElement(0);
};

const updateScoreElement = (score) => {
    scoreElement.innerHTML = score;
};

const startGame = () => {
    timer.start();
    wordInput.disabled = false;
    startButton.disabled = true;
};

const resetDictionary = () => {
    dictionary.forEach((_, word) => {
        dictionary.set(word, false);
    });
};

const resetGame = () => {
    resetDictionary();
    renderList(dictionaryList);
    timer.reset();
    wordInput.disabled = true;
    wordInput.value = "";
    stopText.innerHTML = "";
    updateScoreElement(0);
    startButton.disabled = false;
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

const onWordFound = (word) => {
    dictionary.set(word, true);
    wordInput.value = "";
    renderList(dictionaryList);
    updateScoreElement(KeyWordShell.getScore(dictionary));
};

const handleChange = ({ value, target }) => {
    if (!KeyWordShell.isWordInDictionary({ word: value, dictionary })) {
        return;
    }

    onWordFound(value);
};

const addListeners = (wordInputElement) => {
    wordInputElement.addEventListener("keyup", (event) =>
        handleChange({
            value: event.target.value,
            target: event.target,
        })
    );

    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);
};

bootstrapApp({
    listId: "#words-list",
    inputId: "#input-word",
    startButtonId: "#start-button",
    resetButtonId: "#reset-button",
    stopTextId: "#stop-text",
    scoreId: "#score",
});

export { bootstrapApp };
