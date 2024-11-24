document.getElementById('fileScanForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    const fileResultDiv = document.getElementById('fileResult');
    fileResultDiv.innerHTML = ''; // Clear previous results
    fileResultDiv.innerHTML = '<p>Scanning...</p>';
    
    const apiKey = '86fa81630f05c7272ce9a1c93c5d194dd4dd55b93491c9992a4b3ac1277882a8'; // Replace with your VirusTotal API key
    const formData = new FormData();
    formData.append('file', file);

    try {
        const uploadResponse = await fetch(`https://www.virustotal.com/api/v3/files?timestamp=${Date.now()}`, {
            method: 'POST',
            headers: {
                'x-apikey': apiKey
            },
            body: formData
        });
        const uploadData = await uploadResponse.json();
        const scanId = uploadData.data?.id;

        if (!scanId) {
            fileResultDiv.innerHTML = '<p>Error: Unable to upload the file.</p>';
            return;
        }

        // Periodically check the analysis status until it is complete
        let analysisData;
        while (true) {
            const analysisResponse = await fetch(`https://www.virustotal.com/api/v3/analyses/${scanId}`, {
                method: 'GET',
                headers: {
                    'x-apikey': apiKey
                }
            });
            analysisData = await analysisResponse.json();
            if (analysisData.data.attributes.status === 'completed') {
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
        }

        const totalThreats = analysisData.data.attributes.stats.malicious;
        const threatList = analysisData.data.attributes.results;

        if (totalThreats > 0) {
            let malwareList = '<div style="max-height: 200px; overflow-y: auto;"><ul>';
            for (const [engine, result] of Object.entries(threatList)) {
                if (result.category === 'malicious') {
                    malwareList += `<li><strong>${engine}:</strong> ${result.result}</li>`;
                }
            }
            malwareList += '</ul></div>';

            fileResultDiv.innerHTML = `<p>Not Safe: ${totalThreats} threats detected.</p>${malwareList}`;
        } else {
            fileResultDiv.innerHTML = `<p>Safe: No threats detected.</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        fileResultDiv.innerHTML = '<p>Error occurred while scanning.</p>';
    } finally {
        fileInput.value = ''; // Reset file input
        document.getElementById('fileScanForm').reset(); // Reset the form
    }
});
