
window.bugReportextention = {
    screenshot: '',
    reports: [],
    dynamicDomFlow: false,
    currentProject: {},
    projects: [],
    selectedElement: '',
    selectedElementRect: '',
    currentElementInlineStyle: ''
};

chrome.runtime.onMessage.addListener(gotMessage);

async function gotMessage(message, sender, sendResponse) {
    /**
     * message: inject - turns on the extension and displays the extension UI.
     * Triggered on extention button click.
     *  */ 
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
                settingOptions();
            });
        } else {
            //if extension injected then check and toggle visibility
            toggleElement('ui-br-ext-extention');
        }
    }

    /**
     * message: triger_select
     * Key combo: Cntr-Shift-S
     * Triggers the onSelect() function, which enables element hover and selection (red outline).
     * Used for dynamic elements such as drop downs.
     */
    if (message == "trigger_select") {
        window.bugReportextention.dynamicDomFlow = true;
        const selectOperator = document.getElementById('ui-br-ext-select-button');
        // Imitates the "select operator" click/selection via hot key combo.
        activateOperator(selectOperator.id, selectOperator.classList);        
    }

    /**
     * message: get_screenshot
     * Key combo: Cntr-Shift-U
     * Used to take screenshot of dynamic elements.
     */
    if (message == "get_screenshot") {
        window.bugReportextention.screenshot = await getScreenshot ();
        // turn on report bug
    }
    
    return true;
}