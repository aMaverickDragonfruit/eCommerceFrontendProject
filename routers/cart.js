const express = require('express');
const authMiddleware = require('../middlewares/auth');

const {
  getAllCarts,
  getOneCart,
  createCart,
  updateCart,
  deleteCart,
} = require('../controllers/cart');

const router = express.Router();

// api/carts
router.get('/', authMiddleware, getAllCarts);

// api/carts/:id
router.get('/:id', authMiddleware, getOneCart);
router.post('/', createCart);
router.put('/:id', authMiddleware, updateCart);
router.delete('/:id', authMiddleware, deleteCart);

module.exports = router;
