const sensibility = new Slider('sensibility', '#ff5429');
const obscenity = new Slider('obscenity', '#28cddb');
const threat = new Slider('threat', '#0ea700');

const enable = new SlideButton('enable-button', true);

let save = () => {
    let settings = {
        sensibility: parseInt(sensibility.value),
        obscenity: parseInt(obscenity.value),
        threat: parseInt(threat.value),
    
        enable: enable.toggle,

        lang: 'en',
        mode: document.getElementById('mode').value,
        theme: document.getElementById('theme').value,
    };
    console.log(settings);
    chrome.storage.sync.set(settings, () => console.log('Settings saved'));
    chrome.tabs.getSelected(null, function(tab) {
        let code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
        setTimeout(() => {
            window.close();
        }, 450);
    });
};

/*
 * Onload of the page fetch settings
 */
window.onload = () => {
    sensibility.run();
    obscenity.run();
    threat.run();
    enable.run();

    chrome.storage.sync.get('mode', data => { /*console.log(data);*/ document.getElementById('mode').value = data.mode; });
    chrome.storage.sync.get('theme', data => { /*console.log(data);*/ document.getElementById('theme').value = data.theme });

    chrome.storage.sync.get('enable', data => { /*console.log(data);*/ enable.update(data.enable); });
    chrome.storage.sync.get('sensibility', data => { /*console.log(data);*/ sensibility.set(data.sensibility); sensibility.input.val(data.sensibility).trigger('input'); });
    chrome.storage.sync.get('obscenity', data => { /*console.log(data);*/ obscenity.set(data.obscenity); obscenity.input.val(data.obscenity).trigger('input'); });
    chrome.storage.sync.get('threat', data => { /*console.log(data);*/ threat.set(data.threat); threat.input.val(data.threat).trigger('input'); });
};

document.getElementById('apply-button').addEventListener('click', save);
document.getElementById('enable-input').addEventListener('click', _ => {enable.toggle = !enable.toggle; save();});
document.getElementById("settings").addEventListener("click", () => {
    chrome.runtime.openOptionsPage(() => null)
});