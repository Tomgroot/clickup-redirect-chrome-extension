var currentURL = window.location.href;
if(currentURL.includes("https://app.clickup.com")) {
    chrome.runtime.sendMessage({redirect: currentURL.replace('https://app.clickup.com', 'clickup://')});
}