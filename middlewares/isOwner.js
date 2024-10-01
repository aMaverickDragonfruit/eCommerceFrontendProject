const Product = require('../models/Product');

module.exports = async (req, res, next) => {
  const { id: productId } = req.params;
  const { id: userId } = req.user;

  let isOwner = false;

  try {
    const product = await Product.findById(productId);
    const ownerId = product.userId.toString();
    isOwner = userId === ownerId;
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
  if (isOwner) {
    next();
  } else {
    res.status(403).json({ msg: 'Not Product Owner!' });
  }
};
