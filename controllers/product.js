const Product = require('../models/Product');
const User = require('../models/User');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params?.id);
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Product not Found!' });
  }
};

const createProduct = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const product = new Product(req.body);
    await product.save();

    user.products.push(product._id);
    await user.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params?.id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params?.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
