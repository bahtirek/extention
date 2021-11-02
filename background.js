
chrome.browserAction.onClicked.addListener(buttonClicked);
function buttonClicked(tab) {
  chrome.tabs.sendMessage(tab.id, "inject");
}


/* chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
}); */