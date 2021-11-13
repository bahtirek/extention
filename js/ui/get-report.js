
function NewReport () {
    this.id = 0;
    this.project = "";
    this.token = "";
    this.name = "";
    this.xPath = [];
    this.jira = "";
    this.saveJira = false;
    this.jiraLabel = "";
    this.description = "";
    this.actualResults = "";
    this.expectedResults = "";
    this.stepsToReproduce = "";
    this.screenshotUrl = "";
    this.saveScreenshot = false;
    this.screenshot = '';
    this.savePdf = false;
}

function saveReportButtonInit() {
    setTimeout(function(){
        let saveButton = document.getElementById('ui-br-ext-save-report');
        console.log(saveButton.dataset['listener']);
        if(saveButton && saveButton != null && saveButton.dataset.listener == "off") {
            saveButton.dataset['listener'] = "on";
            saveButton.addEventListener('click', startReport, true);
        }
    }, 500); 
}

async function startReport() {
    document.getElementsByClassName('ui-br-ext-spinner')[0].classList.add('ui-br-ext-spinner-on');
    const report = collectData();
    if (report.saveScreenshot) {
        window.bugReportextention.screenshot = await getScreenshot();
        // don't download image if save as pdf
        // image will be saved in pdf
        if(!report.savePdf) {
            imageDownload('filename');
        }
    }
    submitReport(report);
}

function collectData(){
    let report = new NewReport();
    report.description = document.getElementById('ui-br-ext-description').value;
    report.actualResults = document.getElementById('ui-br-ext-act-results').value;
    report.expectedResults = document.getElementById('ui-br-ext-exp-results').value;
    report.stepsToReproduce = document.getElementById('ui-br-ext-rep-steps').value;
    report.saveJira = document.getElementById('ui-br-ext-save-to-jira').checked;
    report.savePdf = document.getElementById('ui-br-ext-save-to-pdf').checked;
    report.saveScreenshot = document.getElementById('ui-br-ext-save-screenshot').checked;
    return report;
}

async function submitReport(report) {
    console.log(report);
    /* let response = await fetch('url/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(report)
    });

    let result = await response.json(); */

    
    if (report.saveJira) {
        //jira report
        console.log('jira saved');
        createJira();
    }
    if (report.savePdf) {
        savePdf(report); 
    }
}