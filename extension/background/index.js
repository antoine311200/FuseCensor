console.log("Fuse Censor is running in the background!");

console.log("Hello you! Have a wonderful day! <3");

chrome.runtime.onInstalled.addListener(function() {
    const settings = {
        sensibility: 2,
        obscenity: 2,
        threat: 2,
    
        enable: false,

        lang: 'en',
        mode: 'spoiler',
        theme: 'dark',
    };
    chrome.storage.sync.set(settings, function() {
        console.log('Saved new instance of settings');
    });
});