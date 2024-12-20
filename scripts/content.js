var currentURL = window.location.href;
let disabled = false;

chrome.storage.local.get('disabled', function(data) {
    disabled = data.disabled;
});

if(!disabled && currentURL.includes("https://app.clickup.com")) {
    chrome.runtime.sendMessage({redirect: currentURL.replace('https://app.clickup.com', 'clickup://')});
}
