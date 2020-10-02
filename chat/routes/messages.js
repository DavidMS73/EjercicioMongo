var express = require("express");
var router = express.Router();

const ws = require("../wslib");
var [
  getMessages,
  getMessage,
  insertMessage,
  updateMessage,
  deleteMessage,
] = require("../controllers/message");
const messageLogic = require("../logic/messageLogic");

router.get("/", async function (req, res, next) {
  const messages = await getMessages();
  res.send(messages);
});

router.get("/:id", async function (req, res, next) {
  const message = await getMessage(req.params.id);

  if (message === null)
    return res.status(404).send("The message with the given ts was not found.");

  res.send(message);
});

router.post("/", async function (req, res, next) {
  const { error } = messageLogic.validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const newMessage = await insertMessage(req.body);
  ws.sendMessages();
  res.send(newMessage);
});

router.put("/:id", async function (req, res) {
  const { error } = messageLogic.validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const message = await getMessage(req.params.id);

  if (message === null)
    return res.status(404).send("The message was not found.");

  const newMessage = await updateMessage(req.params.id, req.body);
  ws.sendMessages();
  res.send({ message: "Message updated" });
});

router.delete("/:id", async function (req, res) {
  const message = await getMessage(req.params.id);

  if (message === null)
    return res.status(404).send("The message was not found.");

  const delMessage = await deleteMessage(req.params.id);
  ws.sendMessages();
  res.status(204).send();
});

/**router.delete("/:id", (req, res) => {
  messagePersistence.deleteMessage(req.params.id).then((response) => {
    if (response === 1) {
      ws.sendMessages();
      res.status(204).send();
    } else {
      res.status(404).send("Message was not found");
    }
  });
});*/

module.exports = router;
