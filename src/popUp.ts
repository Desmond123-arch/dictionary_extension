import axios from "axios";
const button = document.querySelector("#define-btn");
const wordInput = document.querySelector("#word-input") as HTMLInputElement;
const selectedWord = document.querySelector("#selectedWord");
const meaning = document.querySelector("#meaning");
const playbutton = document.querySelector("#playbtn") as HTMLButtonElement;


//TODO: Handle or the any objects properly
playbutton.style.display = "none";

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
    partOfSpeech: string | null | undefined;
}

async function defineWord(word: string | null | undefined): Promise<wordDefinition> {
    if (word === null || word === undefined) {
        throw new Error("Word is required");
    }
    const explanations: string[] = [];
    const language = navigator.language;
    let definition: wordDefinition;
    let audio_data = { audio: "", text: "" };
    console.log(language);
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = response.data[0];
        console.log(data.phonetics)
        audio_data = data.phonetics.filter((value: { audio: string; text: string }) => value.audio != '')[0] || [];
        let meanings: Meanings[] = [];
        let partOfSpeech = "";
        data.meanings.map((val: any) => {
            partOfSpeech = val.partOfSpeech || "";
            val.definitions.map((definition: any) => {

                meanings.push(
                    {
                        definition: definition.definition,
                        // antonyms: definition.antonyms,
                        // synonyms: definition.synonyms,

                    }
                )
            })
        });


        definition = {
            word: data.word,
            audio_url: audio_data.audio || "",
            meanings: meanings.slice(0, 3),
            partOfSpeech
        }
    } catch (error: any) {
        if (error.status === 404) {
            throw (error.response.data.message + "<br>" + error.response.data.resolution)
        } else {
            throw new Error("An error occurred, please try again later")
        }

    }
    return definition;
}

function generateMeaningsHTML(meanings: Meanings[] | []) {
    const ol = document.createElement('ol');
    meanings.forEach(meaning => {
        const li = document.createElement('li');
        li.innerText = meaning.definition
        ol.appendChild(li);
    });
    return ol;
}

function playSound(url: string) {
    let audio = new Audio(url);
    audio.play();
}

chrome.runtime.sendMessage({ action: "Handshake" }, (response) => { })

function updatePopUp() {
    chrome.storage.sync.get(['mySelection'], async (data) => {
        wordInput?.setAttribute('value', data.mySelection);

        try {
            if (wordInput.value.length === 0) {
                meaning!.innerHTML = "Enter to search"
            }
            else {
                meaning!.innerHTML = "Searching";
                const definition = await defineWord(wordInput?.value);
                if (meaning) {
                    meaning.innerHTML = "";
                    meaning.appendChild(generateMeaningsHTML(definition.meanings));
                }

                if (selectedWord) {
                    selectedWord.innerHTML = definition.word as string;
                }

                if (definition.audio_url) {
                    playbutton.addEventListener("click", () => { playSound(definition.audio_url as string) })
                    playbutton.style.display = "block";
                }
            }
        } catch (err: any) {
            console.log("Error here", err)
            meaning!.innerHTML = err;
        }
    })

}

button?.addEventListener("click", async () => {

    const inputWord = wordInput?.value;
    try {
        if (inputWord.length !== 0) {
            meaning!.innerHTML = "Searching";
            const definition = await defineWord(inputWord)
            if (meaning) {
                meaning.innerHTML = "";
                meaning.appendChild(generateMeaningsHTML(definition.meanings));
            }
            if (selectedWord) {
                selectedWord.innerHTML = definition.word as string;
            }

            if (definition.audio_url) {
                playbutton.addEventListener("click", () => { playSound(definition.audio_url as string) })
                playbutton.style.display = "block";
            } else {
                playbutton.style.display = "none";
            }
        }
    } catch (err: any) {
        meaning!.innerHTML = err;
    }
});

document.addEventListener('DOMContentLoaded', updatePopUp);