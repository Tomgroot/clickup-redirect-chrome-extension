chrome.runtime.onMessage.addListener(function(request, sender) {
    if(request.redirect) {
        chrome.tabs.update(sender.tab.id, {url: request.redirect}, function() {
            setTimeout(function() {
                chrome.tabs.remove(sender.tab.id);
            }, 1000); // Waits 1 second before closing the tab
        });
    }
});