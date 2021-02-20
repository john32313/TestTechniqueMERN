const { client, connection } = require('./connection');
const { uid } = require('uid');

const getProduct = async (filter = {}) => {
  try {
    const db = await connection;
    const product = await db.collection('product').find(filter).toArray();
    return product;
  } catch (err) {
    console.log('error getProduct : ', err);
  }
};

const postProduct = async (data) => {
  try {
    const db = await connection;
    const id = await uid(32);
    const result = await db
      .collection('product')
      .insertOne({ ...data, _id: id });
    return result;
  } catch (err) {
    console.log('error postProduct : ', err);
  }
};

module.exports = { getProduct, postProduct };
