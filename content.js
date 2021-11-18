
window.bugReportextention = {
    screenshot: '',
    reports: [],
    dynamicDomFlow: false,
};

chrome.runtime.onMessage.addListener(gotMessage);

async function gotMessage(message, sender, sendResponse) {
    if (message === 'inject') {
        let extention = document.getElementById('ui-br-ext-extention');
        
        // check if extention is injected
        // if not, inject extention
        if(extention == null) {
            fetch(chrome.runtime.getURL('/extention.html')).then(r => r.text()).then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                setButtonListeners();
                moveExtention();
                resizeExtention();
            });
        } else {
            //if extension injected then check and toggle visibility
            toggleElement('ui-br-ext-extention');
        }
    } 
    //Cntr-Shift-S
    if (message == "trigger_select") {
        console.log('selected');
        window.bugReportextention.dynamicDomFlow = true;
        onSelect();
        //hover select
    }

    //Cntr-Shift-U
    if (message == "get_screenshot") {
        console.log('screenshot');
        window.bugReportextention.screenshot = await getScreenshot ();
        // turn on report bug
    }
    
    return true;
}


