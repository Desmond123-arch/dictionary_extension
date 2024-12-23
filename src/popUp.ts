const text = document.querySelector('.meaning')
const synonyms = document.querySelector('.synonyms');

let selectedWord = "";

chrome.storage.local.get("selectedWord", function (result) {
    selectedWord = result.selectedWord;
});


chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (changes.selectedWord) {
        selectedWord = changes.selectedWord.newValue;
        console.log(selectedWord)
    }
});