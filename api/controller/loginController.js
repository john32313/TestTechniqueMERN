const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { jwtToken } = require('../config');
const { userModel } = require('../model');
const { verifValidJwtToken } = require('../middleware');

router.get('/', verifValidJwtToken, async (req, res) => {
  res.status(200).json({ email: req.decodedToken.email });
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email.length === 0 || password.length === 0) {
    return res.status(401).json({ message: 'Email ou Password invalide' });
  }

  const user = await userModel.get({ email: email });
  console.log(user);
  if (user.length === 0)
    return res.status(401).json({ message: 'Email ou password invalide' });
  if (user[0].password !== password)
    return res.status(401).json({ message: 'Email ou password invalide' });
  const token = await jwt.sign({ email: user[0].email }, jwtToken);
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 3600000),
  });
  return res.sendStatus(200);
});

module.exports = router;
