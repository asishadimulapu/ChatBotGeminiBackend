"use strict";

var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

var dotenv = require('dotenv');

dotenv.config();

var authRoutes = require('./routes/authRoutes');

var chatRoutes = require('./routes/chatRoutes');

var app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
mongoose.connect(process.env.MONGO_URI).then(function () {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, function () {
    return console.log("Server running on ".concat(process.env.PORT));
  });
})["catch"](function (err) {
  return console.error(err);
});
//# sourceMappingURL=server.dev.js.map
