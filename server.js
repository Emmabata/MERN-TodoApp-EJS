const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

const authRoutes = require('./routes/auth.js');
const todoRoutes = require('./routes/todo.js');
require('./config/passport')(passport);

const app = express();
const PORT = process.env.PORT || 5000;

// ======= Middleware Setup ======= //
app.use(cors({ origin: 'http://localhost:8081' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(passport.initialize());

// ======= View Engine ======= //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ======= Routes ======= //
app.use(authRoutes);
app.use(todoRoutes);

console.log('Routes loaded');


// ======= MongoDB Connection ======= //
mongoose.connect(process.env.MONGODB_STR)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

//Home Route
app.get('/', (req, res) => {
  res.redirect('/login');
});

// 404 Page
// // This must be the last middleware after all routes
app.use((req, res) => {
  res.status(404).render('404'); // Catch-all 404
});



// ======= Start Server ======= //
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
