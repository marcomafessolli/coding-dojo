class KeyWordShell {
    static isWordInDictionary({ word, dictionary }) {
        return dictionary.has(word);
    }

    static getScore(dictionary) {
        let score = 0;
        dictionary.forEach((isWordFound, word) => {
            if (isWordFound) score++;
        });

        return score;
    }
}

export { KeyWordShell };
