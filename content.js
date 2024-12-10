chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
  if (message.action === "hello") {
    const word = window.getSelection().toString();

      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
          .then(response => response.json())
          .then((result) => {
        const definition = result[0].meanings[0].definitions[0].definition;
        sendResponse({text: definition});
      })
    return true;
  }
});
