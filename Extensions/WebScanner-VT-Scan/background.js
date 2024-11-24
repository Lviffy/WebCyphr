chrome.runtime.onInstalled.addListener(() => {
    // Create context menu item when right-clicking a link
    chrome.contextMenus.create({
        id: "webcyphr-scan",
        title: "Scan with WebCyphr",
        contexts: ["link"]
    });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "webcyphr-scan" && info.linkUrl) {
        const url = info.linkUrl;

        // Store the URL in local storage for the popup to access
        chrome.storage.local.set({ prefillUrl: url }, () => {
            // Open the extension popup programmatically
            chrome.windows.create({
                url: chrome.runtime.getURL("popup.html"),
                type: "popup",
                width: 400,
                height: 600
            });
        });
    }
});
