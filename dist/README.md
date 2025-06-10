# MERN-TodoApp-EJS
# 📝 Todo App

A secure and simple Todo application built with **Node.js**, **Express**, **MongoDB**, and **EJS**. Users can register, log in, and manage personal tasks. Authentication is powered by **JWT**, and UI is styled using clean CSS directly in the views.

---

## 🚀 Features

- User Signup & Login (JWT authentication)
- Passwords securely hashed with bcrypt
- Auth-protected routes for managing todos
- CRUD operations for todos
- EJS-based UI views with form validation and styling
- Task state: Pending ✅ / Completed ✔️
- Secure cookies, Helmet, and logging via Morgan

---

## 🗂️ Project Structure

├── config/
│ └── passport.js # JWT Strategy setup
├── controllers/
│ ├── authController.js # Login, signup, logout handlers
│ └── todoController.js # Todo CRUD logic
├── middlewares/
│ └── authMiddleware.js # Passport protect middleware
├── models/
│ ├── userModel.js
│ └── todoModel.js
├── routes/
│ ├── auth.js
│ └── todo.js
├── views/
│ ├── login.ejs
│ ├── signup.ejs
│ ├── todos.ejs
│ ├── new.ejs
│ ├── edit.ejs
│ └── 404.ejs
├── .env
├── server.js
├── package.json
└── README.md

🔐 Authentication Flow
On login, a JWT token is generated and stored in a secure HTTP-only cookie.

Routes like /todos are protected using passport-jwt middleware.

🛠️ Technologies Used
Node.js

Express

MongoDB + Mongoose

Passport.js (JWT Strategy)

EJS Templating

bcryptjs

dotenv

cookie-parser

Helmet (Security Headers)

Morgan (Logger)
