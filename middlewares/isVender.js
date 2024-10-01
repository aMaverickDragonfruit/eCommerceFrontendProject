module.exports = async (req, res, next) => {
  console.log(req.user);

  if (req.user.isVender) {
    next();
  } else {
    res.status(403).json({ msg: 'Not a Vender' });
  }
};
