
chrome.browserAction.onClicked.addListener(buttonClicked);
function buttonClicked(tab) {
  chrome.tabs.sendMessage(tab.id, "inject");
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == 'getImage') {
    console.log(request.todo);
    chrome.tabs.captureVisibleTab(null, {format: 'png'}, (dataUrl) => {
      sendResponse({imgSrc:dataUrl});
    }
  );

  return true;
  }
})
/* chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
}); */