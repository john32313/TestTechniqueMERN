const productModel = require('./productModel');

module.exports = {
  productModel: {
    get: productModel.getProduct,
    post: productModel.postProduct,
    delete: productModel.deleteProduct,
    put: productModel.updateProduct,
  },
};
