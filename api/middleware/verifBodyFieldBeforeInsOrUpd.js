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

module.exports = verifBodyFieldBeforeInsOrUpd;
