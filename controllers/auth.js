const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CustomAPIError = require('../errors');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      throw new CustomAPIError('Invalid Credentials', 400);
    }
    if (user.password != password) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = login;
