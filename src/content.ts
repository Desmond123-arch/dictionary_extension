//context menu
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "getWord") {
        sendResponse({ word: window.getSelection()?.toString() })
    }
    if (request.type === "definition") {
        alert(request.definition)
    }
})

// document.addEventListener('selectionchange', () => {
//     const selection = window.getSelection();
//     if (selection && selection.rangeCount > 0) {
//         const selectedText = selection.toString();
//         if (selectedText) {
//             alert(`User selected text: ${selectedText}`);
//         }
//     }
// });
