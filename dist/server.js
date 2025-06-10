 const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// ======= App Setup ======= //
const app = express();
const PORT = process.env.PORT || 3000;

// ======= Middleware ======= //
app.use(cors({ origin: 'http://localhost:8081' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// ======= View Engine ======= //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ======= Passport Strategy ======= //
require('./config/passport')(passport);

// ======= Routes ======= //
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
app.use(authRoutes);
app.use(todoRoutes);

// ======= MongoDB Connection ======= //
mongoose.connect(process.env.MONGODB_STR, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ======= Default & 404 Routes ======= //
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use((req, res) => {
  res.status(404).render('404');
});

// ======= Start Server ======= //
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
