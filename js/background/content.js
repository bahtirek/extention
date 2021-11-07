console.log("content");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    if (message === 'inject') {
        let extention = document.getElementById('ui-br-ext-extention');
        if(extention == null) {
            fetch(chrome.runtime.getURL('/extention.html')).then(r => r.text()).then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                setButtonListeners();
                moveExtention();
                resizeExtention();
            });
        } else {
            if (extention.style.display == 'block') {
                extention.style.display = 'none';
            } else {
                extention.style.display = 'block';
            }
        }

        
    }
}