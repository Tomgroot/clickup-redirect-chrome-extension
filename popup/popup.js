document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.getElementById('disableToggle');

    chrome.storage.local.get('disabled', function(data) {
        checkbox.checked = data.disabled;
    });

    checkbox.addEventListener('change', function() {
        chrome.storage.local.set({'disabled': checkbox.checked});

        if (!checkbox.checked) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                var currentTab = tabs[0];
                if (currentTab) {
                    chrome.runtime.sendMessage({refreshTab: true, tabId: currentTab.id});
                }
            });
        }
    });
});