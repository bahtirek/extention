
function savePdfBtnInit() {
	document.getElementById('ui-br-ext-save-pdf').addEventListener('click', () => {
		console.log('pdf click');
		savePdf();
	})
}


var pages = {
	content: [],
	styles: {
		subheader: {
			fontSize: 15,
			bold: true,
			margin: [0, 20, 0, 5]
		},
		fontSize: 14
	}
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
			let title = {};
			if (item == 'screenshotUrl') {
				body = {
					image: `${report[item]}`,
					width: 550
				}
			} else [
				body = `${report[item]}`
			]
			title = {
				text: `${titles[item]}`,
				style: 'subheader'
			}
			content.push(title);
			content.push(body);
        }
	}
	let screenshot = await getScreenshot ();
	console.log(screenshot);
	let image = {
		image: screenshot,
		width: 550
	};
	content.push(image)
	return content;
}
async function savePdf() {
	let page = await preparePdfPage(testReport)
	pages.content = pages.content.concat(page);
	pdfMake.createPdf(pages).download();
}

function getScreenshot (){
	return html2canvas(document.body).then(function(canvas) {
		var dataUrl = canvas.toDataURL();
		return dataUrl;
	});
}