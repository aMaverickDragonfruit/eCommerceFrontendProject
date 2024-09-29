const mongoose = require('mongoose');

//temp ask Alex
const cartSchema = new mongoose.Schema({
  // add userId, one user has one cart
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number },
    },
  ],
  coupon: {
    type: String,
  },
  discount: {
    type: Number,
  },
  subtotal: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  estimateTotal: {
    type: Number,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
