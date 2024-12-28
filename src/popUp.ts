import axios from "axios";
const button = document.querySelector("#define-btn");
const wordInput = document.querySelector("#word-input") as HTMLInputElement;
const selectedWord = document.querySelector("#selectedWord");
const meaning = document.querySelector("#meaning");
let myWord = "";
let selections;

type Meanings = {
    definition: any,
    // synonyms: string[],
    // antonyms: string[],
   
}

type wordDefinition = {
    word: string | null | undefined,
    audio_url: string | null | undefined, 
    meanings: Meanings[];
    partOfSpeech: string  | null | undefined;
}

async function defineWord(word: string | null | undefined): Promise<wordDefinition> {
    if (word === null || word === undefined) {
        throw new Error("Word is required");
    }
    const explanations: string[] = [];
    const language = navigator.language;
    let definition: wordDefinition;
    console.log(language);
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
       const data = response.data[0];
       console.log(data.phonetics)
       let audio_data = data.phonetics.filter((value: { audio: string; text: string}) => value.audio != '');
       let meanings:Meanings[] = [];
       let partOfSpeech;
        data.meanings.map((val: any) => {
            partOfSpeech = val.partOfSpeech;
            val.definitions.map((definition: any) => {
                
                meanings.push(
                    {
                        definition:definition.definition,
                        // antonyms: definition.antonyms,
                        // synonyms: definition.synonyms,
                        
                    }
                )
            })
        });
        

    definition = {
           word: data.word,
           audio_url: audio_data.audio || " ",
           meanings: meanings.slice(0,3),
           partOfSpeech
       }
       console.log(definition);
    } catch (err) {
        console.log(err);
        throw err;
    }
    return definition;
}

function generateMeaningsHTML(meanings:Meanings[] | []) {
    const ol = document.createElement('ol');
    meanings.forEach(meaning => {
        const li = document.createElement('li');
        li.innerText = meaning.definition
        ol.appendChild(li);
    });
    return ol;
}

chrome.runtime.sendMessage({ action: "Handshake" }, (response) => { })

function updatePopUp() {
    chrome.storage.sync.get(['mySelection'], async (data) => {
        wordInput?.setAttribute('value', data.mySelection);
        const definition = await defineWord(wordInput?.getAttribute('value'));
        if (meaning) {
            meaning.appendChild(generateMeaningsHTML(definition.meanings));
        }

        if (selectedWord) {
            selectedWord.innerHTML = definition.word as string;
        }
    })

}

// button?.addEventListener("click", async () => {
//     const inputWord = wordInput?.value;
//     const definition = await defineWord(inputWord)
//     if (meaning) {
//         meaning.innerHTML = explanations[0] || ""
//     }
//     console.log(selectedWord);
//     if (selectedWord) {
//         selectedWord.innerHTML = explanations[0] || "";
//     }
// });

document.addEventListener('DOMContentLoaded', updatePopUp);