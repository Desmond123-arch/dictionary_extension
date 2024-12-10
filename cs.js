let text;

const word = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const response = await chrome.tabs.sendMessage(tab.id, {
    action: "hello",
  });

  console.log(response);

  text = response?.text;
}

const div = document.getElementById("popup-window");
const button = document.getElementById("button");

button.addEventListener("click", async () => {
  await word();
  console.log(text);
  div.innerText = text;
});
