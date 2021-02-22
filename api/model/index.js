const productModel = require('./productModel');
const userModel = require('./userModel');

module.exports = {
  productModel: {
    get: productModel.getProduct,
    post: productModel.postProduct,
    delete: productModel.deleteProduct,
    put: productModel.updateProduct,
  },
  userModel: {
    get: userModel.getUser,
  },
};
