"use strict";

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var User = require('../models/User');

exports.register = function _callee(req, res) {
  var _req$body, name, email, password, exists, hashed, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          exists = _context.sent;

          if (!exists) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: 'User already exists'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 9:
          hashed = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(User.create({
            name: name,
            email: email,
            password: hashed
          }));

        case 12:
          user = _context.sent;
          res.status(201).json({
            msg: 'User registered successfully'
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            msg: _context.t0.message
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.login = function _callee2(req, res) {
  var _req$body2, email, password, user, match, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            msg: 'Invalid credentials'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          match = _context2.sent;

          if (match) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            msg: 'Invalid credentials'
          }));

        case 12:
          token = jwt.sign({
            userId: user._id
          }, process.env.JWT_SECRET);
          res.json({
            token: token,
            user: {
              id: user._id,
              name: user.name
            }
          });
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            msg: _context2.t0.message
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};
//# sourceMappingURL=authController.dev.js.map
