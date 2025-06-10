const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Render signup page
exports.renderSignup = (req, res) => {
  res.render('signup');
};

// Render login page
exports.renderLogin = (req, res) => {
  res.render('login');
};

// Handle user signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.status(400).render('signup', { error: err.message });
  }
};

// Handle user login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.redirect('/signup');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).render('login', { error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h'
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false, // change to true in production with HTTPS
    maxAge: 3600000
  });

  res.redirect('/todos');
};

// Handle logout
exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/login');
};
