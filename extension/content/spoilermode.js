document.addEventListener('ActivateSpoilerMode', function (options) {     //Adds an eventlistener which activates this file when
    console.log("Successfully loaded spoilermode");                       //ActivateSpoierMode event is sent
    console.log(options.detail)
});

function findSentences(text) {               //Find the sentences in a paragraph. my_text must be a string
    return text.match(/((.*\S+$))/gm)        //Regexp matching paragraphes
}


function splitDocument(node) {              //Splits the document into a list of sentences. node is expected to be document.body
    // console.log("splitting document");
    try {
        sentences = [];
        let paragraphes = findSentences(node.innerText);
        for (element of paragraphes) {
            let regexp = element.match(/((([^\.!\?]+[\.!\?]+)\s)|([^\.!\?]+[\.!\?]+$))/g);      //Regexp matching sentences. Two bugs left : '1.0.2' and 'D. Trump'
            if (regexp != null && regexp.length > 1) {
                sentences = sentences.concat(regexp)
            }
            else {
                sentences = sentences.concat(element)
            }
        }
    } catch { };
    return sentences
}

const allSentences = splitDocument(document.body);   //It automatically splits the document into a list of sentences.

console.log("Spoilermode analysis ends")