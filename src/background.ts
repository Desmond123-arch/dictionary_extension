let word:string | undefined = "";
let definition:string | undefined;

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create(
        {
            title: "Define %s",
            contexts: ["selection"],
            id: "define word"
        }
    )
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (tab?.id) {
        if (tab.id === -1) {
            word = info.selectionText;
        } else {
            const response = await chrome.tabs.sendMessage(tab.id, { type: "getWord" });
             word = response.word;
            await chrome.tabs.sendMessage(tab.id, { type: "definition", definition: word });
        }
        chrome.storage.local.set({ "selectedWord": word });
    }
});


chrome.action.onClicked.addListener(tab => {
    chrome.tabs.query({ active: true, currentWindow: true },  async(tabs) => {
        var activeTab = tabs[0];
        try {
            if (activeTab.id) {
                const response = await chrome.tabs.sendMessage(activeTab.id, {type: "getWord"});
                word = response.word;
                await chrome.tabs.sendMessage(activeTab.id, {type: "definition", definition})
            }
            
        } catch (err) {
            console.log(err);
        }
    });
});




