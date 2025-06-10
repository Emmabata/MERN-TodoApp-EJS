const passport = require('passport');

// Middleware to protect routes
const authenticateJWT = passport.authenticate('jwt', { session: false });

module.exports = {
  authenticateJWT
};
