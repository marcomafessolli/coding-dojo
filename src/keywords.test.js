import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/dom";

import { isWordInDictionary } from "./keywords";
import { renderApp } from "./keyword-shell";

describe("keywords", () => {
  const root = document.createElement("div");
  renderApp(root);
  document.body.appendChild(root);

  it("should inform whether the word is in the dictionary", () => {
    expect(
      isWordInDictionary({
        word: "if",
        dictionary: new Map([["if", false]])
      })
    ).toBe(true);
  });

  it("should reveal the word when the user types an existing word", () => {
    const wordInput = screen.getByLabelText(/Insira a zuera/i);
    
    fireEvent.keyUp(wordInput, { key: 'i'});
    fireEvent.keyUp(wordInput, { key: 'f'});

    expect(wordInput.value).toBe("");
    expect(screen.getByText('if')).toBeInTheDocument();
  });
});
