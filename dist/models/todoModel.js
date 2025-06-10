const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports = mongoose.model('Todo', todoSchema);
