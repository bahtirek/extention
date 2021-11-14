
function savePdfBtnInit() {
	document.getElementById('ui-br-ext-save-pdf').addEventListener('click', () => {
		console.log('pdf click');
		savePdf(false);
	})
}

var pages = {
	content: [],
	pageMargins: [ 20, 40, 20, 40 ],
	styles: {
		subheader: {
			fontSize: 12,
			bold: true,
			margin: [0, 0, 0, 5]
		},
		description: {
			fontSize: 12,
			margin: [0, 0, 0, 20]
		},
		screenshot: {
			margin: [0, 0, 0, 20]
		},
	}
} 

async function savePdf(index) {
	let report = bugReportextention.reports[index];
	let page = await preparePdfPage(report)
	pages.content = pages.content.concat(page);
	await pdfMake.createPdf(pages).download();
	pages.content = [];
}

async function preparePdfPage (report) {
    const list = ['description', 'actualResults', 'expectedResults', 'stepsToReproduce', 'screenshotUrl'];
    const titles = {
		description: 'Description',
		actualResults: 'Actual results', 
		expectedResults: 'Expected results', 
		stepsToReproduce: 'Steps to reproduce'
    }
    let content = [];

    for (const item of list) {
        if (report[item].length > 0) {
					
			let title = {
				text: `${titles[item]}`,
				style: 'subheader'
			}

			let description = {
				text: `${report[item]}`,
				style: 'description'
			}

			content.push(title);
			content.push(description);
        }
	}

	if(report.saveScreenshot) {
		if (!report.screenshot) {
			report.screenshot = await getScreenshot();
		} 
		let image = {
			image: report.screenshot,
			width: 550,
			pageBreak: 'after',
			style: 'screenshot'

		};
		content.push(image)
	}
	
	return content;
}


const testReport = {
    id: 1,
    project: "EXTCOM",
    token: "token",
    xPath: [ String ],
    jiraUrl: "https://companyname.jira.com/EXTCOM-1201",
    jiraTicket: "EXTCOM-1201",
    jiraTitle: "Button bug report",
    jiraLabel: "Some label",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim, voluptatum quod. Repellendus reiciendis quos dolorem tempora? ",
    actualResults: "Inventore ipsam, praesentium repudiandae numquam delectus commodi impedit suscipit. Nemo et possimus totam similique?",
    expectedResults: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim, voluptatum quod. Repellendus reiciendis quos dolorem tempora? ",
    stepsToReproduce: "Inventore ipsam, praesentium repudiandae numquam delectus commodi impedit suscipit. Nemo et possimus totam similique?",
    screenshotUrl: ""
}
