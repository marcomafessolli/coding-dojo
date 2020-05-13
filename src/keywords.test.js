import { isWordInDictionary } from "./keywords";

describe("keywords", () => {
    it("should inform whether the word is in the dictionary", () => {
        expect(
            isWordInDictionary({
                word: "if",
                dictionary: new Map([["if", false]]),
            })
        ).toBe(true);
    });
});
