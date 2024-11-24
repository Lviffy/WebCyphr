document.addEventListener('DOMContentLoaded', function () {
    const urlField = document.getElementById('url');
    const resultDiv = document.getElementById('result');

    // Check if there's a prefilled URL stored
    chrome.storage.local.get('prefillUrl', (data) => {
        if (data.prefillUrl) {
            const prefilledUrl = data.prefillUrl;
            urlField.value = prefilledUrl;
            chrome.storage.local.remove('prefillUrl');

            // Automatically trigger the scan with the prefilled URL
            scanUrl(prefilledUrl);
        }
    });

    // Event listener for form submission
    document.getElementById('scanForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const url = urlField.value;
        resultDiv.innerHTML = '<p>Scanning...</p>';
        scanUrl(url);
    });

    // Function to scan the URL
    function scanUrl(url) {
        chrome.runtime.sendMessage({ type: 'scan-url', url: url }, (response) => {
            if (response.status === 'success') {
                const finalResult = response.result;
                const stats = finalResult.data.attributes.stats;
                const totalThreats = stats.malicious;

                if (totalThreats > 0) {
                    const engines = finalResult.data.attributes.results;
                    const detectedThreats = Object.entries(engines).filter(([, result]) => result.category === 'malicious');

                    let threatList = '<ul>';
                    detectedThreats.forEach(([engine, result]) => {
                        threatList += `<li>${engine}: ${result.result}</li>`;
                    });
                    threatList += '</ul>';

                    resultDiv.innerHTML = `<p>Not Safe: ${totalThreats} threats detected.</p>${threatList}`;
                } else {
                    resultDiv.innerHTML = `<p>Safe: No threats detected.</p>`;
                }
            } else {
                resultDiv.innerHTML = `<p>Error occurred while scanning: ${response.message}</p>`;
            }
        });
    }
});
