const { Strategy: JwtStrategy } = require('passport-jwt');
const User = require('../models/userModel');

// Custom extractor to read JWT 
// from cookies instead of Authorization header
const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

// JWT strategy options
const opts = {
  jwtFromRequest: cookieExtractor, // Tell Passport to extract JWT from cookies
  secretOrKey: process.env.SECRET_KEY // Secret key used to verify token signature
};

// Export a function that takes 'passport' and configures 
// the JWT strategy
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // Find the user in the database using the ID from the token payload
        const user = await User.findById(jwt_payload.id);
        // If user is found, proceed with the request
        return user ? done(null, user) : done(null, false);
      } catch (err) {
        // If an error occurs, pass it to Passport
        return done(err, false);
      }
    })
  );
};
