"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String
});
module.exports = mongoose.model('User', userSchema);
//# sourceMappingURL=User.dev.js.map
