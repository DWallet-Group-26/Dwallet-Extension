export {}
chrome.browserAction.onClicked.addListener(function () {
    chrome.storage.local.get(["privateKey"], function (result) {
        if (result.privateKey==undefined){
            chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
        }
        else{
            chrome.browserAction.setPopup({popup: "index.html"});
        }
    });
});
