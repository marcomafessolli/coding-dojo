import "@testing-library/jest-dom";
import { getByText, getByLabelText, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

// const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
describe("keyword-shell", () => {
    it("is not working", () => {});
    // let dom;
    // let container;

    // beforeEach(() => {
    //     dom = new JSDOM(html, {
    //         runScripts: "dangerously",
    //         pretendToBeVisual: true,
    //     });
    //     container = dom.window.document.body;
    // });

    // it("should reveal the word when the user types an existing word", () => {
    //     const wordInput = getByLabelText(container, /Insira a zuera/i);

    //     fireEvent.keyUp(wordInput, { key: "I", keyCode: "KeyI" });
    //     fireEvent.change(wordInput, { target: { value: "i" } });
    //     fireEvent.keyUp(wordInput, { key: "F", keyCode: "KeyF" });
    //     fireEvent.change(wordInput, { target: { value: "if" } });
    //     fireEvent.change(wordInput, { target: { value: "" } });

    //     // expect(wordInput.value).toBe("");
    //     expect(getByText(container, "if")).toBeInTheDocument();
    // });
});
