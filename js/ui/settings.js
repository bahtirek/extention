let listeners = [
    {
        id: 'ui-br-ext-btn-link',
        type: 'click',
        callback: toggleElement,
        parameter: 'ui-br-ext-new-project-cont',
    },
    {
        id: 'ui-br-ext-save-new-project',
        type: 'click',
        callback: saveNewProject,
        parameter: '',
    },
];


function saveNewProject(){
    let element = document.getElementById('ui-br-ext-new-project')
    let projectLabel = element.value.trim();
    element.classList.remove('ui-br-ext-error');
    console.log(projectLabel);
    
    if(projectLabel.length > 0) {
        toggleButtonSpinner('ui-br-ext-save-new-project', 'on');
        setTimeout(() => {
            toggleButtonSpinner('ui-br-ext-save-new-project', 'off');

            //on success
            //toggleElement('ui-br-ext-new-project-cont');
            //element.value = ''; 

            //on error
            element.classList.add('ui-br-ext-error');
        }, 1000);
    }
    
}


