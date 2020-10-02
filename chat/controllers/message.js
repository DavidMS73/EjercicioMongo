const { mongoUtils, dataBase } = require("../lib/utils/mongo");
const COLLECTION_NAME = "messages";

function getMessages() {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({})
      .toArray()
      .finally(() => client.close());
  });
}

function getMessage(messageTs) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ ts: parseInt(messageTs) })
      .finally(() => client.close());
  });
}

function insertMessage(message2Insert) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne({
        author: message2Insert.author,
        message: message2Insert.message,
        ts: new Date().getTime(),
      })
      .finally(() => client.close());
  });
}

function updateMessage(messageTs, body) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .updateOne(
        {
          ts: parseInt(messageTs),
        },
        {
          $set: { author: body.author, message: body.message },
        }
      )
      .finally(() => client.close());
  });
}

function deleteMessage(messageTs) {
  return mongoUtils.conn().then((client) => {
    client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .deleteOne({ ts: parseInt(messageTs) })
      .finally(() => client.close());
  });
}

module.exports = [
  getMessages,
  getMessage,
  insertMessage,
  updateMessage,
  deleteMessage,
];
