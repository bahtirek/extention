async function getScreenshot (){
	document.getElementById('ui-br-ext-extention').style.display = 'none';
	await setDelay(100);
	return new Promise((resolve, reject)=> {
		chrome.runtime.sendMessage({todo: "getImage"}, response => {
			if(response.imgSrc) {
				resolve(response.imgSrc);
				document.getElementById('ui-br-ext-extention').style.display = 'block';
			} else {
				reject();
				document.getElementById('ui-br-ext-extention').style.display = 'block';
			}
		});
	})
}

function setDelay(timeout){
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, timeout);
	})
}

async function imageDownload(filename) {
	if (!window.bugReportextention.screenshot) {
		window.bugReportextention.screenshot = await getScreenshot();
	}
	
	let dlLink = document.getElementById('ui-br-ext-download-image');
	let MIME_TYPE = "image/png";
	dlLink.download = filename;
	dlLink.href = window.bugReportextention.screenshot;
	dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
	dlLink.click();
}
