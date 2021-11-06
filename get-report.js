
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
}

document.getElementById('ui-br-ext-save-report').addEventListener('click', startReport, true);

async function startReport() {
    document.getElementsByClassName('ui-br-ext-spinner')[0].classList.add('ui-br-ext-spinner-on');
    const report = collectData();
    if (report.saveScreenshot) {
        report.screenshot = await getScreenshot();
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
        createJira();
    }
    
}