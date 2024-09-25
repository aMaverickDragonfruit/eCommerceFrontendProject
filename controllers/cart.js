const Cart = require('../models/Cart');

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getOneCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params?.id);
    res.status(200).json(cart);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params?.id, req.body, {
      new: true,
    });
    res.status(200).json(cart);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params?.id);
    res.status(200).json({ message: 'Cart deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllCarts,
  getOneCart,
  createCart,
  updateCart,
  deleteCart,
};
