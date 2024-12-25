chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "getWord"){
        let word = window.getSelection()?.toString()
        sendResponse({selectedWord: word})
        return true;
    }
    if (request.type === "definition") {
        alert(request.definition)
    }
})