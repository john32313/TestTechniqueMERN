const router = require('express').Router();
const { productModel } = require('../model/index');
const { verifBodyFieldBeforeInsOrUpd } = require('../middleware');

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
  if (result.result.ok) return res.sendStatus(201);
  return res.status(422).json({ message: 'Error creating ressource' });
});

router.put('/:id', verifBodyFieldBeforeInsOrUpd, async (req, res) => {
  const result = await productModel.put(Number(req.params.id), req.bodyField);
  console.log(result);
  if (result.result.ok && result.result.nModified) return res.sendStatus(201);
  return res.status(422).json({ message: 'Error updating ressource' });
});

router.delete('/:id', async (req, res) => {
  const result = await productModel.delete({ _id: Number(req.params.id) });
  if (result.result.n) return res.sendStatus(204);
  return res.status(422).json({ message: 'Error deleting ressource' });
});

module.exports = router;
