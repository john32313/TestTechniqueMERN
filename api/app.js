const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { client } = require('./model/connection');

const { productController } = require('./controller');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/product', productController);

app.use('/', (req, res) => {
  console.log('devo');
  client.close();
  res.status(404).send('Wrong Way ! ');
});

module.exports = app;
