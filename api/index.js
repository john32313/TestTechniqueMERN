const express = require('express');
const morgan = require('morgan');

const app = express();
const { port } = require('./config');
const { client } = require('./model/connection');

const { productController } = require('./controller');

app.use(morgan('dev'));

app.use('/api/product', productController);

app.use('/', (req, res) => {
  console.log('devo');
  client.close();
  res.status(404).send('Wrong Way ! ');
});

app.listen(port, (error) => {
  if (error) throw new Error(error.message);
  console.log(`Server is running on port ${port}`);
});
