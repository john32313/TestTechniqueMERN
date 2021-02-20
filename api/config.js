require('dotenv').config();

const dbname =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_DB_NAME_TEST
    : process.env.MONGO_DB_NAME;

module.exports = {
  port: process.env.PORT || 5001,
  mongoUrl: process.env.MONGO_URL,
  mongoDbName: dbname,
};
