import { isWordInDictionary } from "./src/keywords";

const dictionary = new Map([["if", false], ["else", false], ["while", false]]);

let dictionaryList;

const renderApp = containerElement => {
  const wordInput = document.createElement("div");
  dictionaryList = document.createElement("div");

  containerElement.appendChild(wordInput);
  containerElement.appendChild(dictionaryList);

  renderInput(wordInput);
  renderList(dictionaryList);
};

const renderInput = inputElement => {
  inputElement.innerHTML = "";

  const label = document.createElement("label");
  label.setAttribute("for", "inputWord");
  label.innerHTML = "Insira a zuera";
  inputElement.appendChild(label);

  const input = document.createElement("input");
  input.id = "inputWord";

  addListeners(input);
  inputElement.appendChild(input);
};

const renderList = dictionaryListElement => {

  if (!dictionaryListElement) return;

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
  if (isWordInDictionary({ value, dictionary })) {
    dictionary.set(value, true);
    target.value = "";
    renderList(dictionaryList);
  }
};

const addListeners = wordInputElement => {
  wordInputElement.addEventListener("keyup", event =>
    handleChange(event.target)
  );
};

setTimeout(() => {
  renderApp(document.getElementById("root"));
}, 1000);

export { renderApp };
