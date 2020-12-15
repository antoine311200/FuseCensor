const maxWords = 150;


/**
 * The preprocessing function to feed our neural network
 * @param list The list of sentences to process
 * @param processed A list of frequencies of the 10,000 most encountered words in the English language
 */
const process = (list, processed) => {
    let lst = [];
    for (let sent of list) {
        let nl = [];
        let length = 0;
        for (let word of sent.toLowerCase().trim().replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g," ").split(' ')) {
            let value = parseInt(processed['word_index'][word]);
            nl.push((!isNaN(value)) ? value : 0);
            length++;
        }
        nl = nl.concat(new Array(maxWords - length).fill(0));
        lst.push(nl);
    }
    return lst;
};