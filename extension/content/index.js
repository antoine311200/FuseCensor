let settings;


const conversion = [0.1, 0.2, 0.3, 0.4, 0.5];


chrome.storage.sync.get(['enable', 'sensibility', 'obscenity', 'threat', 'lang', 'result', 'theme', 'mode'], result => {
    var event = new CustomEvent("CollectedSettings", {          //These instructions collect the options from the online storage and
        detail: {                                               //stock them into a dictionnary. Then, they send an event
            enabled: result.enable,                             //CollectedSettings which allows to keep processing
            sensibility: result.sensibility,
            threat: result.threat,
            obscenity: result.obscenity,
            lang: result.lang,
            mode: result.mode,
            theme: result.theme
        }
    });
    document.dispatchEvent(event);
    console.log("Successfully collected settings");
    settings = result;
});


document.addEventListener("CollectedSettings", function (options) {     //Adds an eventlistener which activates when                          
    if (options.detail.enabled) {                                       //the event CollectedSettings is sent. It checks if the
        console.log("Extension is enabled!");                           //extension is enabled, and triggers the right mode.
        if (options.detail.mode == "spoiler") {
            console.log("The current mode is spoiler.");
            launch();
        } else if (options.detail.mode == "gentleman") {
            console.log("The current mode is gentleman");
            gentlemanmode(options)
        }
    } else {
        console.log("Extension is disabled !")
    };
});


function gentlemanmode(options) {                                       //Inserts the gentlemanmode script into the html page
    let script = document.createElement('script');                      //Creates a new html element of type script
    script.setAttribute('type', 'module');
    let url = chrome.extension.getURL('content/gentlemanmode.js');      //Catches the url where the gentlemanmode.js script is storaged
    script.setAttribute('src', url);                                    //and links it to the script element we just ceated
    document.body.appendChild(script);                                  //Adds the script to the document
    script.onload = function () {
        var event = new CustomEvent("ActivateGentlemanMode", options);  //Creates the event which activates gentlemanmode.js script
        document.dispatchEvent(event);
    }
}


function parseSpoiler(node, json, model) {                              //function applying spoiler style to any insult detected
    if (node.nodeType == 1 && node.nodeName != "SCRIPT") {
        for (var i = 0; i < node.childNodes.length; i++) {              //if the node has a child that may contain text, we parse 
            if (node.childNodes[i].nodeType == 3 && (node.nodeName == 'P' || node.nodeName == 'LI')) {             //on the child
                const text = node.textContent;                          //we get the content of the child and cut it into sentences
                let sentences = text.match(/((([^\.!\?]+[\.!\?]+)\s)|([^\.!\?]+[\.!\?]+$)|(.+\n)|(.+\r\n))/g);
                if (sentences != null) {                                 //if there is sentences, the IA analyzes them
                    const data = process(sentences, json);
                    let prediction = model.predict(tf.tensor(data));    //prediction is the result of the IA analysis
                    const analyze = async (prediction) => {
                        const p = await prediction.data();
                        let swear = []
                        for (let i = 0; i < Math.floor(p.length / 6); i++) {     //for each sentence, we compare its level of
                            if (p[6 * i] > conversion[parseInt(settings.sensibility) - 1] ||    //sensibility with the user settings
                                p[6 * i + 1] > conversion[parseInt(settings.sensibility) - 1] ||
                                p[6 * i + 2] > conversion[parseInt(settings.obscenity) - 1] ||
                                p[6 * i + 3] > conversion[parseInt(settings.threat) - 1] ||
                                p[6 * i + 4] > conversion[parseInt(settings.threat) - 1] ||
                                p[6 * i + 5] > conversion[parseInt(settings.threat) - 1]) {
                                swear.push(sentences[i]);               //if the word is too harsh, its sentence is added to the
                            }                                           //"censored sentence list"
                        }
                        if (swear.length > 1) {                         //if there is at least one sentence to censor, we create spoilers
                            const spoiler = new Spoiler(node, swear);
                            spoiler.spoil();
                        }
                    }
                    analyze(prediction);                                 //We call this function on the predictions given by the AI
                }
            }
            else parseSpoiler(node.childNodes[i], json, model);          //If the node doesn't have children which may contain text,
        }                                                                //we call it on each of its children.
    }
}


const url = chrome.runtime.getURL('content/engine/process.json');       //the url where the IA model is storaged


let launch = async () => {                                              //asynchronous function which loads the IA model and calls the
    fetch(url)                                                          //parseSpoiler function.
        .then((response) => response.json())
        .then(async (json) => {
            if (settings.enable) {
                const model = await tf.loadLayersModel('https://raw.githubusercontent.com/antoine311200/Host-Utils-Data/master/tfjs-newmodel/model.json');
                parseSpoiler(document.body, json, model);
                console.log("Spoiler Analysis is over");
            }
        });
};