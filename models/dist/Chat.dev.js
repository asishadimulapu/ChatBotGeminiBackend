"use strict";

var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  prompt: String,
  response: String,
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('Chat', chatSchema);
//# sourceMappingURL=Chat.dev.js.map
