(()=>{"use strict";({994:function(){var e=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,c){function s(e){try{a(o.next(e))}catch(e){c(e)}}function r(e){try{a(o.throw(e))}catch(e){c(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,r)}a((o=o.apply(e,t||[])).next())}))};let t;chrome.runtime.onInstalled.addListener((()=>e(void 0,void 0,void 0,(function*(){var e;chrome.contextMenus.create({id:"Define",title:"Define %s",contexts:["link","selection"],visible:!0});for(const t of null!==(e=chrome.runtime.getManifest().content_scripts)&&void 0!==e?e:[])for(const e of yield chrome.tabs.query({url:t.matches}))if(!e.url.match(/(chrome|chrome-extension):\/\//gi)&&e.id&&t.all_frames&&t.js){const n={target:{tabId:e.id,allFrames:t.all_frames},files:t.js,injectImmediately:"document_start"===t.run_at};chrome.scripting.executeScript(n)}})))),chrome.tabs.onActivated.addListener((function(e){chrome.tabs.get(e.tabId,(function(e){var t;console.log(e),(null===(t=e.url)||void 0===t?void 0:t.endsWith("pdf"))?chrome.contextMenus.update("Define",{visible:!0}):chrome.contextMenus.update("Define",{visible:!1})}))})),chrome.action.onClicked.addListener((t=>e(void 0,void 0,void 0,(function*(){console.log("Hello world"),yield chrome.tabs.sendMessage(t.id,{type:"getWord"})})))),chrome.runtime.onMessage.addListener(((e,n,o)=>{"selectedText"===e.action&&(t=e.text,chrome.storage.sync.set({mySelection:t})),"Handshake"===e.action&&(chrome.storage.sync.set({mySelection:""}),chrome.storage.sync.set({explanations:[]}))})),chrome.contextMenus.onClicked.addListener(((n,o)=>e(void 0,void 0,void 0,(function*(){t=n.selectionText,chrome.storage.sync.set({mySelection:t}),chrome.action.openPopup()}))))}})[994]()})();