module.exports = async (req, res, next) => {
  const { id: productId } = req.params;
  const { products } = req.user;

  const isOwner = products.includes(productId);
  if (isOwner) {
    next();
  } else {
    res.status(403).json({ msg: 'Not Product Owner!' });
  }
};
