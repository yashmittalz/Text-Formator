document.addEventListener("DOMContentLoaded", function () {
    const outputTextContainer = document.getElementById("outputTextContainer");
    const outputText = document.getElementById("outputText");
    const copyText = document.getElementById("copyText");
    const notification = document.createElement("div");
    notification.className = "notification";
    document.body.appendChild(notification);

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = "block";
        setTimeout(() => {
            notification.style.display = "none";
        }, 2000);
    }

    function convertText(caseType) {
        const inputText = document.getElementById("inputText").value;
        let outputTextValue = "";

        switch (caseType) {
            case 'sentence':
                outputTextValue = toSentenceCase(inputText);
                break;
            case 'lower':
                outputTextValue = inputText.toLowerCase();
                break;
            case 'upper':
                outputTextValue = inputText.toUpperCase();
                break;
            case 'title':
                outputTextValue = toTitleCase(inputText);
                break;
        }

        outputText.value = outputTextValue;
        toggleOutputTextContainerClass(outputTextValue);
    }

    function toSentenceCase(text) {
        return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, function (match) {
            return match.toUpperCase();
        });
    }

    function toTitleCase(text) {
        return text.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function toggleOutputTextContainerClass(text) {
        if (text.trim() !== "") {
            outputTextContainer.classList.add("has-text");
        } else {
            outputTextContainer.classList.remove("has-text");
        }
    }

    function copyToClipboard() {
        if (outputText.value.trim() !== "") {
            outputText.select();
            outputText.setSelectionRange(0, 99999); // For mobile devices

            navigator.clipboard.writeText(outputText.value)
                .then(() => {
                    showNotification("Text copied to clipboard!");
                })
                .catch(err => {
                    console.error("Failed to copy text: ", err);
                });
        }
    }

    outputTextContainer.addEventListener("click", copyToClipboard);
    copyText.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent triggering the parent container's click event
        copyToClipboard();
    });

    // Expose convertText globally so buttons can trigger it
    window.convertText = convertText;
});
