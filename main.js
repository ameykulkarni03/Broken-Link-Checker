function enableBtn() {
    document.getElementById("checkButton").removeAttribute("disabled");
}


function checkLinks() {
    const urlInput = document.getElementById("url");
    const resultMessage = document.getElementById("result");
    const url = urlInput.value.trim();

    // Check if the URL is empty
    if (url === "") {
        resultMessage.textContent = "Please enter a valid URL.";
        return;
    }

    // Construct the proxy URL with the user-specified URL as a query parameter
    const proxyUrl = `proxy.php?url=${encodeURIComponent(url)}`;

    // Make a request to the PHP proxy
    fetch(proxyUrl)
        .then(response => {
            if (response.status === 200) {
                resultMessage.textContent = "No broken links found on this page.";
            } else {
                resultMessage.textContent = `Error: ${response.status} - Broken link detected.`;
            }
        })
        .catch(error => {
            console.error(error);
            resultMessage.textContent = "An error occurred while checking the link.";
        });
}
