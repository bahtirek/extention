function savePdfBtnInit() {
	document.getElementById('ui-br-ext-save-pdf').addEventListener('click', () => {
		console.log('pdf click');
		//pdfFlow.savePdf(0);
	})
}

let pages = {
	content: [],
	pageMargins: [20, 40, 20, 40],
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
	let page = await this.preparePdfPage(report)
	pages.content = pages.content.concat(page);
	await pdfMake.createPdf(pages).download();
	pages.content = [];
}

async function preparePdfPage(report) {
	const list = ['description', 'actualResults', 'expectedResults', 'stepsToReproduce', 'screenshotUrl'];
	const titles = {
		description: 'Description',
		actualResults: 'Actual results',
		expectedResults: 'Expected results',
		stepsToReproduce: 'Steps to reproduce'
	}
	let content = [];

	if(window.bugReportextention.currentProject.label) {
		let project = {
			text: `Project:  ${window.bugReportextention.currentProject.label}`,
			style: 'description'
		}
		content.push(project);
	}

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

	if (report.saveScreenshot) {
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