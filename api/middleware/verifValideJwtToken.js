const jwt = require('jsonwebtoken');
const { jwtToken } = require('../config');

const verifValidJwtToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.sendStatus(401);
  const decode = await jwt.verify(token, jwtToken);
  if (decode) {
    req.decodedToken = decode;
    return next();
  }
  return res.sendStatus(401);
};
module.exports = verifValidJwtToken;
