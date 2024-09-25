const express = require('express');

const {
  getAllCarts,
  getOneCart,
  createCart,
  updateCart,
  deleteCart,
} = require('../controllers/cart');

const router = express.Router();

// api/carts
router.get('/', getAllCarts);

// api/carts/:id
router.get('/:id', getOneCart);
router.post('/', createCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

module.exports = router;
