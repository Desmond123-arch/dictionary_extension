chrome.runtime.onInstalled.addListener(async () => {
    for (const cs of chrome.runtime.getManifest().content_scripts) {
        for (const tab of await chrome.tabs.query({url: cs.matches})) {
            if (tab.url.match(/(chrome|chrome-extension):\/\//gi)) {
                continue;
            }
            const target = {tabId: tab.id, allFrames: cs.all_frames};
            if (cs.js[0]) chrome.scripting.executeScript({
                files: cs.js,
                injectImmediately: cs.run_at === 'document_start',
                world: cs.world,
                target,
            });

        }
    }
});