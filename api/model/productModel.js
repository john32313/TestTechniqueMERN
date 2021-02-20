const { client, connection } = require('./connection');

const getProduct = async (filter = {}) => {
  try {
    const db = await connection;
    const product = await db.collection('product').find(filter).toArray();
    return product;
  } catch (err) {
    console.log('error getProduct : ', err);
  }
};

module.exports = { getProduct };
