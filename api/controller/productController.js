const router = require('express').Router();
const { productModel } = require('../model/index');

router.get('/', async (req, res) => {
  const product = await productModel.get();
  res.json(product);
});

router.get('/:id', async (req, res) => {
  const product = await productModel.get({ _id: Number(req.params.id) });
  if (product.length === 0)
    return res
      .status(404)
      .json({ message: 'Le produit ne semble pas exister.' });
  return res.json(product);
});

module.exports = router;
