const express = require('express');
const morgan = require('morgan');

const app = express();
const { port } = require('./config');

app.use(morgan('dev'));

app.use('/', (req, res) => {
  res.status(200).send('Express server ok !');
});

app.listen(port, (error) => {
  if (error) throw new Error(error.message);
  console.log(`Server is running on port ${port}`);
});
