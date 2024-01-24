chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === "install" || details.reason === "update") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs.length > 0) {
                // If an active tab is found, update its URL
                chrome.tabs.update(tabs[0].id, {url: "clickup://home"});
            } else {
                // If no active tab is found, you might want to open a new tab or handle this case differently
                console.log("No active tab found");
            }
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender) {
    if(request.redirect) {
        chrome.tabs.update(sender.tab.id, {url: request.redirect}, function() {
            let tabId = sender.tab.id;
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                if (tabId == tabId && changeInfo.status === 'complete') {
                    chrome.tabs.remove(tabId);
                    chrome.tabs.onUpdated.removeListener(listener);
                }
            });
        });
    }
});