function checkLinks() {
    const urlInput = document.getElementById("url");
    const resultMessage = document.getElementById("result");
    const url = urlInput.value.trim();

    // Check if the URL is empty
    if (url === "") {
        resultMessage.textContent = "Please enter a valid URL.";
        return;
    }

    // Create a dummy <a> element to check links
    const dummyLink = document.createElement("a");
    dummyLink.href = url;

    // Use XMLHttpRequest to fetch the HTML of the page
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const htmlContent = xhr.responseText;
                const doc = new DOMParser().parseFromString(htmlContent, "text/html");
                const links = doc.querySelectorAll("a");

                let brokenLinks = 0;

                // Check each link
                links.forEach(function (link) {
                    dummyLink.href = link.href;
                    if (dummyLink.protocol === "http:" || dummyLink.protocol === "https:") {
                        const linkStatus = dummyLink.status;
                        if (linkStatus === 0 || (linkStatus >= 400 && linkStatus < 600)) {
                            brokenLinks++;
                        }
                    }
                });

                if (brokenLinks === 0) {
                    resultMessage.textContent = "No broken links found on this page.";
                } else {
                    resultMessage.textContent = `Found ${brokenLinks} broken links on this page.`;
                }
            } else {
                resultMessage.textContent = "Error: Unable to fetch the page.";
            }
        }
    };
    xhr.send();
}