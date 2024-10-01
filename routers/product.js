const express = require('express');
const authMiddleware = require('../middlewares/auth');
const venderMiddleware = require('../middlewares/isVender');
const ownerMiddleware = require('../middlewares/isOwner');

const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product');

const router = express.Router();
// api/products
router.get('/', authMiddleware, getAllProducts);

// api/products/:id
router.get('/:id', authMiddleware, getOneProduct);
router.post('/', authMiddleware, venderMiddleware, createProduct);
router.put('/:id', authMiddleware, ownerMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
