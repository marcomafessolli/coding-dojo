const isWordInDictionary = ({ word, dictionary }) => {
    return dictionary.has(word);
};

export { isWordInDictionary };
