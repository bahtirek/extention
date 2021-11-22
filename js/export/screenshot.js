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
	screenshotLink('ui-br-ext-download-image-full', window.bugReportextention.screenshot, 'full_screenshot');
	await cropImage();
	await setDelay(1000);
	screenshotLink('ui-br-ext-download-image-cropped', window.bugReportextention.croppedScreenshot, 'cropped_screenshot');
}

function screenshotLink(id, dataUrl, filename) {
	let dlLink = document.getElementById(id);
	let MIME_TYPE = "image/png";
	dlLink.download = filename;
	dlLink.href = dataUrl;
	dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
	dlLink.click();
}

async function cropImage() {
	let img = new Image();
	let rect = window.bugReportextention.selectedElement.getBoundingClientRect();
	let dataUrl = window.bugReportextention.screenshot;
	let canvas = document.getElementById('ui-br-ext-canvas');
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, 0, 0);
	ctx.canvas.width = rect.width+30; 
	ctx.canvas.height = rect.height+30;
	await new Promise(r => img.onload=r, img.src=dataUrl);
	ctx.drawImage(img, rect.left-10, rect.top-10, rect.width+20, rect.height+20, 5, 5, rect.width+20, rect.height+20);
	window.bugReportextention.croppedScreenshot = canvas.toDataURL("image/png");
}

