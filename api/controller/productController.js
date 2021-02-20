const router = require('express').Router();
const { productModel } = require('../model/index');

const verifBodyFieldBeforeInsOrUpd = (req, res, next) => {
  const { name, price, type, rating, warranty_years, available } = req.body;
  if (typeof name === 'undefined')
    return res.status(400).json({ message: 'Field name is missing' });
  if (typeof price === 'undefined')
    return res.status(400).json({ message: 'Field price is missing' });
  if (typeof type === 'undefined')
    return res.status(400).json({ message: 'Field type is missing' });
  if (typeof rating === 'undefined')
    return res.status(400).json({ message: 'Field rating is missing' });
  if (typeof warranty_years === 'undefined')
    return res.status(400).json({ message: 'Field warranty_years is missing' });
  if (typeof available === 'undefined')
    return res.status(400).json({ message: 'Field available is missing' });
  req.bodyField = {
    name,
    price,
    type,
    rating,
    warranty_years,
    available,
  };
  return next();
};

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

router.post('/', verifBodyFieldBeforeInsOrUpd, async (req, res) => {
  const result = await productModel.post(req.bodyField);
  if (result.result.ok === 1) return res.sendStatus(201);
  return res.status(422).json({ message: 'Error creating ressource' });
});

module.exports = router;
