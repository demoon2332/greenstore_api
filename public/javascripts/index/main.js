// main.js
document.getElementById("fetchButton").addEventListener("click", fetchData);

async function fetchData() {
    const options = {
        hostname: 'jsonplaceholder.typicode.com',
        path: '/posts',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch(`https://${options.hostname}${options.path}`, {
            method: options.method,
            headers: options.headers,
        });

        if (response.ok) {
            const data = await response.json();
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "<h2>Response:</h2><pre>" + JSON.stringify(data, null, 2) + "</pre>";
        } else {
            console.error("Request to fetch quotes failed. Status:", response.status);
        }
    } catch (error) {
        console.error("Request to fetch quotes failed:", error);
    }
}
