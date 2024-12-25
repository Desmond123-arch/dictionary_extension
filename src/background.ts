chrome.runtime.onInstalled.addListener(async () => {
    for (const cs of chrome.runtime.getManifest().content_scripts!) {
        for (const tab of await chrome.tabs.query({ url: cs.matches })) {
            if (tab.url!.match(/(chrome|chrome-extension):\/\//gi)) {
                continue;
            }
            if (tab.id && cs.all_frames && cs.js) {
                const injection: chrome.scripting.ScriptInjection<any[], void> = {
                    target: {
                        tabId: tab.id,
                        allFrames: cs.all_frames
                    },
                    files: cs.js,
                    injectImmediately: cs.run_at === 'document_start'
                };
                chrome.scripting.executeScript(injection);
            }
        }
    }
    chrome.contextMenus.create({
        id: "Define",
        title: "Define %s",
        contexts: ["link", "selection"],
    });
})

let mySelection: any;

chrome.tabs.onActivated.addListener(function (info) {
    var tab = chrome.tabs.get(info.tabId, function (tab) {
        console.log(tab)
        if (tab.url?.endsWith("pdf")) {
            chrome.tabs.sendMessage(tab.id as number, { type: "definition", definition: "Hello world" })
            chrome.contextMenus.update("Define", { visible: true }
            )
        } else {
            chrome.contextMenus.update("Define", { visible: false }
            )
        }
    })
});


chrome.action.onClicked.addListener(async (tab) => {
    const response = await chrome.tabs.sendMessage(tab.id as number, { type: "getWord" });
    chrome.tabs.sendMessage(tab.id as number, { type: "definition", definition: response.selectedWord })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "selectedText") {
        mySelection = request.text;
        console.log(mySelection)
        chrome.storage.sync.set({mySelection: mySelection})
    }
})

