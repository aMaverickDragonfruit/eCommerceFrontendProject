const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    validate: {
      validator: function (value) {
        return value > 0;
      },
    },
    required: true,
  },
  stock: {
    type: Number,
    validate: {
      validator: function (value) {
        return value > 0;
      },
    },
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
