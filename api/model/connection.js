const MongoClient = require('mongodb').MongoClient;
const { mongoUrl, mongoDbName } = require('../config');

const client = new MongoClient(mongoUrl, {
  useNewUrlParser: true,
  poolSize: 10,
});

const connection = async () => {
  console.log('connect');
  try {
    await client.connect();
    const db = client.db(mongoDbName);
    return db;
  } catch (err) {
    console.log('error connection : ', err);
  }
};

const database = connection().then((db) => db);

module.exports = {
  client,
  connection: database,
};
