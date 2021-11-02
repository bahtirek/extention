console.log("content");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    if (message === 'inject') {
        fetch(chrome.runtime.getURL('/extension.html')).then(r => r.text()).then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            moveExtension();
            resizeExtension();
        });
    }
}