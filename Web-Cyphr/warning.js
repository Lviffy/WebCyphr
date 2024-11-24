document.addEventListener("DOMContentLoaded", () => {
  // Parse query parameters from the current page URL
  const params = new URLSearchParams(window.location.search);
  const blockedUrl = params.get("url"); // Retrieve the 'url' parameter
  
  if (!blockedUrl || blockedUrl === "null") {
    document.body.innerHTML = "<h1>Error: Unable to retrieve the blocked URL.</h1>";
    return;
  }

  // Log the blocked URL for debugging
  console.log("Blocked URL received:", blockedUrl);

  // Display the blocked URL on the page
  document.getElementById("blocked-url").innerText = `Blocked URL: ${blockedUrl}`;

  // Add an event listener for the "Ignore Warning" button
  const ignoreButton = document.getElementById("ignore-warning");
  ignoreButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to continue? This site may be harmful.")) {
      window.location.href = blockedUrl; // Redirect to the blocked URL
    }
  });
});
