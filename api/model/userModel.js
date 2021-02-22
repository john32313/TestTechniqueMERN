const { connection } = require('./connection');

const getUser = async (filter) => {
  try {
    if (Object.keys(filter).length === 0)
      throw new Error('Error filter find user collection');
    const db = await connection;
    const user = db.collection('user').find(filter).toArray();
    return user;
  } catch (err) {
    console.error('Error getting user : ', err);
  }
};

module.exports = { getUser };
