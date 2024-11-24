// Google Safe Browsing API endpoint and key
const SAFE_BROWSING_API_URL = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=<API-KEY-HERE>";
// DOM elements
const toggleSwitch = document.getElementById("real-time-toggle");
const threatDetectionStatus = document.getElementById("status-text");
const totalBlockedDisplay = document.getElementById("total-blocked");
const generatedPasswordDisplay = document.getElementById("generated-password");
const copyPasswordBtn = document.getElementById("copy-password");
// Variables to keep monitoring state
let monitoringActive = true;
let totalBlocked = 0;
// Function to update the threat detection status text
function updateThreatDetectionStatus() {
  threatDetectionStatus.textContent = monitoringActive
    ? "Monitoring active threats..."
    : "Real-Time Threat Detection is paused.";
}
// Load the switch state from storage on popup open
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("monitoringActive", (data) => {
    // Set monitoringActive to stored value or default to true
    monitoringActive = data.monitoringActive !== undefined ? data.monitoringActive : true;
    toggleSwitch.checked = monitoringActive;
    updateThreatDetectionStatus();
  });
});
// Listen for toggle changes and update storage
chrome.storage.onChanged.addListener((changes) => {
  if (changes.monitoringActive) {
    monitoringActive = changes.monitoringActive.newValue;
  }
});

// Update storage and monitoring state when the toggle is clicked
toggleSwitch.addEventListener("change", () => {
  monitoringActive = toggleSwitch.checked;
  chrome.storage.sync.set({ monitoringActive: monitoringActive });
  updateThreatDetectionStatus();
});
// Real-Time Threat Detection using Google Safe Browsing API
chrome.webRequest.onBeforeRequest.addListener(
    async function (details) {
      if (monitoringActive) {
        const url = details.url;
        try {
          const isMalicious = await checkUrlWithSafeBrowsing(url);
          if (isMalicious) {
            // Redirect to the warning page
            chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("warning.html") });
            return { cancel: true }; // Stop loading the harmful page
          }
        } catch (error) {
          console.error("Real-Time URL Detection Error:", error);
        }
      }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );

// Function to check URL using Google Safe Browsing API
async function checkUrlWithSafeBrowsing(url) {
  const requestBody = {
    client: {
      clientId: "yourcompanyname",
      clientVersion: "1.0.0"
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url: url }]
    }
  };

  const response = await fetch(SAFE_BROWSING_API_URL, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  return data && data.matches && data.matches.length > 0;
}

// Secure Link Verifier
document.getElementById("link-verifier-btn").addEventListener("click", () => {
  navigateToSection("link-verifier-section");
});

document.getElementById("verify-url").addEventListener("click", async () => {
  const url = document.getElementById("url-input").value;
  const resultDiv = document.getElementById("verification-result");
  try {
    const isMalicious = await checkUrlWithSafeBrowsing(url);
    resultDiv.textContent = isMalicious ? "⚠️ Unsafe URL detected!" : "✅ Safe to visit.";
    resultDiv.style.color = isMalicious ? "red" : "green";
  } catch (error) {
    resultDiv.textContent = "Error checking the URL.";
    resultDiv.style.color = "red";
  }
});
// Strong Password Generator
document.getElementById("password-generator-btn").addEventListener("click", () => {
  navigateToSection("password-generator-section");
});

document.querySelectorAll("#password-generator-section input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        checkbox.parentElement.classList.add("selected-option");
      } else {
        checkbox.parentElement.classList.remove("selected-option");
      }
    });
  });
  
document.getElementById("generate-password").addEventListener("click", () => {
  const length = document.getElementById("password-length").value;
  const includeUppercase = document.getElementById("uppercase").checked;
  const includeLowercase = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSpecial = document.getElementById("special").checked;

  const password = generatePassword({
    length: parseInt(length),
    uppercase: includeUppercase,
    lowercase: includeLowercase,
    numbers: includeNumbers,
    special: includeSpecial,
  });

  generatedPasswordDisplay.textContent = password
    ? `Generated Password: ${password}`
    : "Please select at least one character type.";
  generatedPasswordDisplay.classList.toggle("hidden", password === "");
  copyPasswordBtn.classList.toggle("hidden", password === "");
});
// Copy generated password to clipboard
copyPasswordBtn.addEventListener("click", () => {
  const password = generatedPasswordDisplay.textContent.replace("Generated Password: ", "");
  navigator.clipboard.writeText(password).then(() => {
    copyPasswordBtn.textContent = "Copied!";
    setTimeout(() => {
      copyPasswordBtn.textContent = "Copy";
    }, 1500);
  });
});
// Back button functionality
document.querySelectorAll(".back-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    navigateToSection("main-menu");
  });
});
// Section navigation function
function navigateToSection(sectionId) {
  document.querySelectorAll(".popup-section, #main-menu").forEach(el => el.classList.add("hidden"));
    // Show the selected section
    const section = document.getElementById(sectionId);
    section.classList.remove("hidden");
    // Scroll to the selected section
    section.scrollIntoView({ behavior: 'smooth' });
}
// Password generation helper
function generatePassword({ length, uppercase, lowercase, numbers, special }) {
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()";

  let charSet = "";
  if (uppercase) charSet += upperChars;
  if (lowercase) charSet += lowerChars;
  if (numbers) charSet += numberChars;
  if (special) charSet += specialChars;

  if (charSet === "") return ""; // No character type selected

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }
  return password;
}
document.querySelectorAll("#password-generator-section .checkbox-button").forEach(label => {
    label.addEventListener("click", () => {
      const checkbox = label.querySelector("input[type='checkbox']");
      checkbox.checked = !checkbox.checked; // Toggle the checkbox state
      label.classList.toggle("selected", checkbox.checked); // Add or remove the selected class
    });
  });
