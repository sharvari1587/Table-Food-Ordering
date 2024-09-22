const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const adlogin= async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password!' });
  }

  const admin = await Admin.findOne({ username }).select('+password');

  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const token = signToken(admin._id);
  res.status(200).json({
    status: 'success',
    token
  });
};

module.exports = {adlogin};
