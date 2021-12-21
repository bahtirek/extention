
function storageGet(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(function(result) {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve (result[key]);
        });
    })
}

function storageSet(key, value){
    chrome.storage.local.set({[key]: value}, function() {
        return true;
    });
}
