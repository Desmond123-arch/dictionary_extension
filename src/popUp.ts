const button = document.querySelector("#define-btn");
const wordInput = document.querySelector("#word-input");
const selectedWord = document.querySelector("s#electedWord");
const meaning = document.querySelector("#meaning");
let myWord = "";
let selections;

import axios from "axios";
async function defineWord(word: string | null | undefined): Promise<string[]> {
    if (word === null || word === undefined) {
        return [];
    }
    const explanations: string[] = [];
    const language = navigator.language;
    console.log(language);
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        response.data[0].meanings[0].definitions.map((data: any) => {
            explanations.push(data.definition)
        })

    } catch (err) {
        console.log(err);
    }
    return explanations;
}

chrome.runtime.sendMessage({ action: "Handshake" }, (response) => { })

function updatePopUp() {
    chrome.storage.sync.get(['mySelection'], async (data) => {
        wordInput?.setAttribute('value', data.mySelection);
        const explanations = await defineWord(wordInput?.getAttribute('value'));
        console.log(explanations);
        if (meaning) {
            meaning.innerHTML = explanations[0]
        }

    })

}


document.addEventListener('DOMContentLoaded', updatePopUp);