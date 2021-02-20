const express = require('express');
const morgan = require('morgan');

const app = express();
const { client } = require('./model/connection');

const { productController } = require('./controller');

app.use(morgan('dev'));

app.use('/api/product', productController);

app.use('/', (req, res) => {
  console.log('devo');
  client.close();
  res.status(404).send('Wrong Way ! ');
});

module.exports = app;
