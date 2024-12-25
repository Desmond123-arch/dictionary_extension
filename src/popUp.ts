const button = document.querySelector("#define-btn");
const wordInput = document.querySelector("#word-input");
const selectedWord = document.querySelector("s#electedWord");
const meaning = document.querySelector("#meaning");
let myWord = "";
let selections;

chrome.runtime.sendMessage({action: "Handshake"}, (response) => {})

function updatePopUp() {
    chrome.storage.sync.get(['mySelection'], (data) => {
        wordInput?.setAttribute('value', data.mySelection)
    })
}


document.addEventListener('DOMContentLoaded', updatePopUp);