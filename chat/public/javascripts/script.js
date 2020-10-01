const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  if (data.error != undefined) {
    document.getElementById("error").innerHTML = `<h5> ${data.error}</h5>`;
  } else {
    const html = data
      .map((item) => `<h4>${item.author}: </h4> <p>${item.message}</p>`)
      .join(" ");
    document.getElementById("messages").innerHTML = html;
  }
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const author = document.getElementById("author");
  const message = document.getElementById("message");
  ws.send(JSON.stringify({ author: author.value, message: message.value }));
  author.value = "";
  message.value = "";
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
