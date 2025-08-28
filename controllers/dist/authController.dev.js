"use strict";

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var User = require('../models/User');

exports.register = function _callee(req, res, next) {
  var _req$body, name, email, password, existingUser, saltRounds, hashedPassword, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password; // Check if user already exists

          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: 'User already exists with this email'
          }));

        case 7:
          // Hash password with higher salt rounds for better security
          saltRounds = 12;
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.hash(password, saltRounds));

        case 10:
          hashedPassword = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
          }));

        case 13:
          user = _context.sent;
          res.status(201).json({
            msg: 'User registered successfully',
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            }
          });
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          next(_context.t0); // Pass error to error handling middleware

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

exports.login = function _callee2(req, res, next) {
  var _req$body2, email, password, user, isPasswordValid, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Find user and include password for comparison

          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email.toLowerCase().trim()
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            msg: 'Invalid email or password'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          isPasswordValid = _context2.sent;

          if (isPasswordValid) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            msg: 'Invalid email or password'
          }));

        case 12:
          // Generate JWT token with expiration
          token = jwt.sign({
            userId: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: '24h'
          } // Token expires in 24 hours
          );
          res.json({
            token: token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            }
          });
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0); // Pass error to error handling middleware

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};
//# sourceMappingURL=authController.dev.js.map
