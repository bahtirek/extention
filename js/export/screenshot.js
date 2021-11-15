function getScreenshot (){
	document.getElementById('ui-br-ext-extention').style.display = 'none';
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
	dlLink.removeAttribute('data-downloadurl');
}
