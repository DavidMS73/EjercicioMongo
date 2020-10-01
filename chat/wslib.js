const WebSocket = require("ws");
var [getMessages, insertMessage] = require("./controllers/message");
const messageLogic = require("./logic/messageLogic");
const clients = [];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      message = JSON.parse(message);
      const { error } = messageLogic.validateMessage(message);
      if (error) {
        const msgString = "Last error: " + error.details[0].message;
        ws.send(JSON.stringify({ error: msgString }));
        msgString.value = "";
      } else {
        insertMessage(message);
      }
      sendMessages();
    });
  });
};

const sendMessages = () => {
  clients.forEach((client) => {
    getMessages().then((result) => {
      result = JSON.stringify(result);
      client.send(result);
    });
  });
};

exports.wsConnection = wsConnection;
exports.sendMessages = sendMessages;
