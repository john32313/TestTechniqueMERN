const productModel = require('./productModel');

module.exports = {
  productModel: {
    get: productModel.getProduct,
  },
};
