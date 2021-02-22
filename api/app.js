const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const { client } = require('./model/connection');
const { verifValidJwtToken } = require('./middleware');

const { productController, loginController } = require('./controller');
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/login', loginController);
app.use('/api/product', verifValidJwtToken, productController);

app.use('/', (req, res) => {
  client.close();
  res.status(404).send('Wrong Way ! ');
});

module.exports = app;
