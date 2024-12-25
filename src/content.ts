chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "getWord"){
        let word = window.getSelection()?.toString()
        sendResponse({selectedWord: word})
        return true;
    }
    // if (request.type === "definition") {
    //     alert(request.definition)
    // }
});

document.addEventListener("mouseup", async() => {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText) {

    //    alert("working")
        // Send the selected text to the background script
        const response = await chrome.runtime.sendMessage({
            action: "selectedText",
            text: selectedText
        });
  
        return true;
    }
});