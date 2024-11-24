const PHISHING_API = "https://example-phishing-detection-api.com/check";

chrome.webNavigation.onCommitted.addListener(async (details) => {
  if (details.frameId === 0) {
    const url = details.url;

    try {
      const response = await fetch(`${PHISHING_API}?url=${encodeURIComponent(url)}`);
      const result = await response.json();

      if (result.is_phishing) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon128.png",
          title: "SecureMe Alert",
          message: "Warning! This site has been identified as phishing."
        });

        chrome.tabs.update(details.tabId, { url: "about:blank" });
      }
    } catch (error) {
      console.error("Error checking URL:", error);
    }
  }
});
chrome.runtime.onInstalled.addListener(() => {
  console.log("Service worker registered successfully.");
});

chrome.runtime.onStartup.addListener(() => {
  console.log("Extension started.");
});

function sanitizeURL(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `*://${url}/*`;
  }
  return `${url}/*`;
}

function loadBlacklistAndUpdateRules() {
  fetch(chrome.runtime.getURL("blacklist.json"))
    .then((response) => response.json())
    .then((blacklist) => {
      const dynamicRules = blacklist.map((url, index) => ({
        id: index + 1,
        priority: 1,
        action: {
          type: "redirect",
          redirect: {
            extensionPath: "/warning.html"
          }
        },
        condition: {
          urlFilter: sanitizeURL(url), 
          resourceTypes: ["main_frame"] 
        }
      }));

      chrome.declarativeNetRequest.updateDynamicRules(
        {
          removeRuleIds: dynamicRules.map((rule) => rule.id),
          addRules: dynamicRules
        },
        () => {
          console.log("Blacklist rules updated:", dynamicRules);
        }
      );
    })
    .catch((error) => {
      console.error("Error loading blacklist.json:", error);
    });
}

chrome.runtime.onInstalled.addListener(() => {
  loadBlacklistAndUpdateRules();
});

chrome.webRequest.onBeforeRequest.addListener(
  async function (details) {
    if (monitoringActive) {
      const url = details.url;
      try {
        const isMalicious = await checkUrlWithSafeBrowsing(url);
        if (isMalicious) {
          chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("warning.html") });
          return { cancel: true };
        }
      } catch (error) {
        console.error("Real-Time URL Detection Error:", error);
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
chrome.runtime.onStartup.addListener(() => {
  loadBlacklistAndUpdateRules();
});
chrome.webNavigation.onCommitted.addListener(async (details) => {
    if (details.frameId === 0) {
      const url = details.url;
  
      try {
        const response = await fetch(`${PHISHING_API}?url=${encodeURIComponent(url)}`);
        const result = await response.json();
  
        if (result.is_phishing) {
          const threatData = { url, timestamp: new Date().toLocaleString() };

          chrome.storage.local.get(["threatLog"], (data) => {
            const log = data.threatLog || [];
            log.push(threatData);
            chrome.storage.local.set({ threatLog: log });
          });

          chrome.runtime.sendMessage({ type: "new-threat", data: threatData });
  
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icon128.png",
            title: "SecureMe Alert",
            message: "Warning! This site has been identified as phishing."
          });
  
          chrome.tabs.update(details.tabId, { url: "about:blank" });
        }
      } catch (error) {
        console.error("Error checking URL:", error);
      }
    }
  });