const express = require('express');
const authMiddlewares = require('../middlewares/auth');

const {
  getAllCarts,
  getOneCart,
  createCart,
  updateCart,
  deleteCart,
} = require('../controllers/cart');

const router = express.Router();

// api/carts
router.get('/', authMiddlewares, getAllCarts);

// api/carts/:id
router.get('/:id', authMiddlewares, getOneCart);
router.post('/', authMiddlewares, createCart);
router.put('/:id', authMiddlewares, updateCart);
router.delete('/:id', authMiddlewares, deleteCart);

module.exports = router;
