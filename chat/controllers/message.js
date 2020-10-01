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

function insertMessage(message) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne(message)
      .finally(() => client.close());
  });
}

module.exports = [getMessages, insertMessage];
