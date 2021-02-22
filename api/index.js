const app = require('./app.js');
const { port } = require('./config');

app.listen(port, (error) => {
  if (error) throw new Error(error.message);
  console.log(`Server is running on port ${port}`);
});
