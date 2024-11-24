document.getElementById('scanForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const url = document.getElementById('url').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>Scanning...</p>';
    const apiKey = '86fa81630f05c7272ce9a1c93c5d194dd4dd55b93491c9992a4b3ac1277882a8'; // Replace with your VirusTotal API key

    try {
        // Submit URL to be scanned
        const response = await fetch('https://www.virustotal.com/api/v3/urls', {
            method: 'POST',
            headers: {
                'x-apikey': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `url=${encodeURIComponent(url)}`
        });
        const data = await response.json();

        // Get the scan ID
        const scanId = data.data.id;

        // Polling function to check scan status
        async function getScanResult() {
            const analysisResponse = await fetch(`https://www.virustotal.com/api/v3/analyses/${scanId}`, {
                method: 'GET',
                headers: {
                    'x-apikey': apiKey
                }
            });
            const analysisData = await analysisResponse.json();
            
            // Check if the analysis is complete
            if (analysisData.data.attributes.status === 'completed') {
                return analysisData;
            } else {
                // Wait for 5 seconds and retry
                await new Promise(resolve => setTimeout(resolve, 5000));
                return getScanResult();
            }
        }

        // Wait for the scan to complete
        const finalResult = await getScanResult();

        // Check the analysis results
        const stats = finalResult.data.attributes.stats;
        const totalThreats = stats.malicious;
        
        if (totalThreats > 0) {
            // Get the detailed results from the analysis
            const engines = finalResult.data.attributes.results;
            const detectedThreats = Object.entries(engines).filter(([, result]) => result.category === 'malicious');

            // Create a list of detected threats
            let threatList = '<ul>';
            detectedThreats.forEach(([engine, result]) => {
                threatList += `<li>${engine}: ${result.result}</li>`;
            });
            threatList += '</ul>';

            resultDiv.innerHTML = `<p>Not Safe: ${totalThreats} threats detected.</p>${threatList}`;
        } else {
            resultDiv.innerHTML = `<p>Safe: No threats detected.</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = '<p>Error occurred while scanning.</p>';
    }
});
