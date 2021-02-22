require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5001,
  mongoUrl: process.env.MONGO_URL,
  mongoDbName: process.env.MONGO_DB_NAME,
  jwtToken: process.env.TOKEN_KEY,
};
