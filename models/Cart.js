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
    set: (v) => parseFloat(v).toFixed(2),
  },
  tax: {
    type: Number,
    set: (v) => parseFloat(v).toFixed(2),
  },
  estimateTotal: {
    type: Number,
    set: (v) => parseFloat(v).toFixed(2),
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
