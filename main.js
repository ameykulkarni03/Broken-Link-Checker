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

    // Create an HTTP HEAD request to check links
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                resultMessage.textContent = "No broken links found on this page.";
            } else {
                resultMessage.textContent = `Error: ${xhr.status} - Broken link detected.`;
            }
        }
    };
    xhr.send();
}
