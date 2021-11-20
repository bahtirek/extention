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


//Called on select's change evenlistener
// gets selected value, sets current project, changes innerhtml
function chooseProject() {
    let value = document.getElementById('ui-br-ext-projects').value;
    let project = window.bugReportextention.projects.find(project => project.id == value);
    window.bugReportextention.currentProject = project;
    document.getElementById('ui-br-ext-project-name').innerHTML = project.label;
}


function saveNewProject(){
    let projects = window.bugReportextention.projects;
    let projectLabel = document.forms["ui-br-ext-new-project"]["ui-br-ext-new-project-label"];
    let projectName = document.forms["ui-br-ext-new-project"]["ui-br-ext-new-project-name"];
    let label = projectLabel.value.trim();
    let name = projectName.value.trim();
    setError(projectLabel, '');
    setError(projectName, '');
    
    if( ( label && label.length > 0 ) || ( name && label.name > 0 )){
        toggleButtonSpinner('ui-br-ext-save-new-project', 'on');
        let projectExist = projects.findIndex( project => project.label == label);
        if (projectExist == -1) {
            setTimeout(() => {
                toggleButtonSpinner('ui-br-ext-save-new-project', 'off');
    
                //on success
                let project = {
                    id: 11,
                    label: label,
                    name: name
                }
                projects.push(project);
                window.bugReportextention.currentProject = project;
                document.getElementById('ui-br-ext-project-name').innerHTML = project.label;
                createSelectOptions([project], 'ui-br-ext-projects', 'selected');
                toggleElement('ui-br-ext-new-project-cont');
                projectLabel.value = ''; 
                projectName.value = ''; 
    
                //on error
                //setError('ui-br-ext-new-project', 'Sorry something went wrong. Please try again later');
            }, 1000);
        } else {
            toggleButtonSpinner('ui-br-ext-save-new-project', 'off');
            setError(projectLabel, 'Project exist');
        }
        
    }
}

function saveNewProject2(){
    let element = document.getElementById('ui-br-ext-new-project')
    let projectLabel = element.value.trim();
    let projects = window.bugReportextention.projects;
    setError('ui-br-ext-new-project', '');
    
    if(projectLabel && projectLabel.length > 0) {
        toggleButtonSpinner('ui-br-ext-save-new-project', 'on');
        let projectExist = projects.findIndex( project => project.label == projectLabel);
        if (projectExist == -1) {
            setTimeout(() => {
                toggleButtonSpinner('ui-br-ext-save-new-project', 'off');
    
                //on success
                let project = {
                    id: 11,
                    label: projectLabel
                }
                projects.push(project);
                window.bugReportextention.currentProject = project;
                document.getElementById('ui-br-ext-project-name').innerHTML = project.label;
                createSelectOptions([project], 'ui-br-ext-projects', 'selected');
                toggleElement('ui-br-ext-new-project-cont');
                element.value = ''; 
    
                //on error
                //setError('ui-br-ext-new-project', 'Sorry something went wrong. Please try again later');
            }, 1000);
        } else {
            toggleButtonSpinner('ui-br-ext-save-new-project', 'off');
            setError('ui-br-ext-new-project', 'Project exist');
        }
        
    }
}

function setError (element, message){
    element.nextElementSibling.innerHTML = message;
}

function setProjectOptions() {
    //get data from backend
    window.bugReportextention.projects = projects;
    createSelectOptions(projects, 'ui-br-ext-projects');
}

//
function createSelectOptions(options, selectId, selected) {
    let select = document.getElementById(selectId);
    let newOptions = '';
    selected = selected ? 'selected' : '';
    if (!selected) {
        select.innerHTML = '';
        newOptions = '<option value="">Choose project</option>';
        selected = '';
    } 

    options.forEach(option => {
        newOptions += `<option value="${option.id}" ${selected}>${option.label}</option>`;
    });

    select.insertAdjacentHTML('beforeend', newOptions);
}

let projects = [
    {
        id: 1,
        value: "project1",
        label: "Project1",
        name: "Description project1"
    },
    {
        id: 2,
        value: "project2",
        label: "Project2",
        name: "Description project2"
    },
    {
        id: 3,
        value: "project3",
        label: "Project3",
        name: "Description project3"
    },
    {
        id: 4,
        value: "project4",
        label: "Project4",
        name: "Description project4"
    },
    {
        id: 5,
        value: "project5",
        label: "Project5",
        name: "Description project5"
    },
    {
        id: 6,
        value: "project6",
        label: "Project6",
        name: "Description project6"
    },
]


