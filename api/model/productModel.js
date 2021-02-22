const { connection } = require('./connection');
const uuid = require('uuid-int');

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
    const id = await uuid(500).uuid();
    const result = await db
      .collection('product')
      .insertOne({ ...data, _id: id });
    return result;
  } catch (err) {
    console.log('error postProduct : ', err);
  }
};

const deleteProduct = async (id) => {
  try {
    const db = await connection;
    const result = db.collection('product').deleteOne(id);
    return result;
  } catch (err) {
    console.log('error deleteProduct : ', err);
  }
};

const updateProduct = async (id, data) => {
  try {
    const db = await connection;
    const result = await db
      .collection('product')
      .updateOne({ _id: id }, { $set: { ...data } }, { upsert: true });
    return result;
  } catch (err) {
    console.log('error postProduct : ', err);
  }
};

module.exports = { getProduct, postProduct, deleteProduct, updateProduct };
