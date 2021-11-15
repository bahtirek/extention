
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

chrome.commands.onCommand.addListener((command) => {
  console.log(command);

  //Cntr-Shift-S
  if (command === 'trigger_select') {
    console.log(command);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, "trigger_select");  
    });
  }
  
  //Cntr-Shift-U
  if (command === 'get_screenshot') {
    console.log(command);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, "get_screenshot");  
    });
  }
});
/* chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
}); */