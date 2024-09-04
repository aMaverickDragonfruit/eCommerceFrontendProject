const mongoose = require('mongoose');

//temp ask Alex
const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number },
    },
  ],
  coupon: {
    type: String,
  },
});

const Cart = mongoose.model('Cart', userSchema);

module.exports = Cart;
