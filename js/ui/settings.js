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
    {
        id: 'ui-br-ext-projects',
        type: 'change',
        callback: chooseProject,
        parameter: '',
    },
];


function chooseProject() {
    let value = document.getElementById('ui-br-ext-projects').value;
    window.bugReportextention.currentProject = value;
    
}

function saveNewProject(){
    let element = document.getElementById('ui-br-ext-new-project')
    let projectLabel = element.value.trim();
    element.classList.remove('ui-br-ext-error');
    
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

function setProjectOptions() {
    //get data from backend
    createSelectOptions(projects, 'ui-br-ext-projects');
}

//
function createSelectOptions(options, selectId) {
    let select = document.getElementById(selectId);
    select.innerHTML = '';
    let newOptions = '<option value="">Choose project</option>';
    options.forEach(option => {
        newOptions += `<option value="${option.id}">${option.project}</option>`;
    });
    select.insertAdjacentHTML('beforeend', newOptions);
}

let projects = [
    {
        id: 1,
        value: "project1",
        project: "Project1",
        descriptio: "Description project1"
    },
    {
        id: 2,
        value: "project2",
        project: "Project2",
        descriptio: "Description project2"
    },
    {
        id: 3,
        value: "project3",
        project: "Project3",
        descriptio: "Description project3"
    },
    {
        id: 4,
        value: "project4",
        project: "Project4",
        descriptio: "Description project4"
    },
    {
        id: 5,
        value: "project5",
        project: "Project5",
        descriptio: "Description project5"
    },
    {
        id: 6,
        value: "project6",
        project: "Project6",
        descriptio: "Description project6"
    },
]


