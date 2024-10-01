const express = require('express');
const authMiddlewares = require('../middlewares/auth');

const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product');

const router = express.Router();
// api/products
router.get('/', authMiddlewares, getAllProducts);

// api/products/:id
router.get('/:id', authMiddlewares, getOneProduct);
router.post('/', authMiddlewares, createProduct);
router.put('/:id', authMiddlewares, updateProduct);
router.delete('/:id', authMiddlewares, deleteProduct);

module.exports = router;
