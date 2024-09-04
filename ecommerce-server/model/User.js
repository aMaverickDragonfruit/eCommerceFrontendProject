const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.includes("@");
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
  isVender: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String, //temp ask alex
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
