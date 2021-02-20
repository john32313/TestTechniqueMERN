const router = require('express').Router();
const { productModel } = require('../model/index');

router.get('/', async (req, res) => {
  const product = await productModel.get();
  res.json(product);
});

router.get('/:id', async (req, res) => {
  const product = await productModel.get({ _id: Number(req.params.id) });
  res.json(product);
});

module.exports = router;
