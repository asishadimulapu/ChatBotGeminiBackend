"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Global error handling middleware
var errorHandler = function errorHandler(err, req, res, next) {
  console.error('Error:', err); // Mongoose duplicate key error

  if (err.code === 11000) {
    var field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      msg: "".concat(field.charAt(0).toUpperCase() + field.slice(1), " already exists")
    });
  } // Mongoose validation error


  if (err.name === 'ValidationError') {
    var errors = Object.values(err.errors).map(function (error) {
      return error.message;
    });
    return res.status(400).json({
      msg: 'Validation failed',
      errors: errors
    });
  } // JWT errors


  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      msg: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      msg: 'Token expired'
    });
  } // MongoDB connection errors


  if (err.name === 'MongoError' || err.name === 'MongooseError') {
    return res.status(500).json({
      msg: 'Database connection error'
    });
  } // Default error


  var statusCode = err.statusCode || 500;
  var message = process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message;
  res.status(statusCode).json(_objectSpread({
    msg: message
  }, process.env.NODE_ENV === 'development' && {
    stack: err.stack
  }));
}; // 404 handler


var notFound = function notFound(req, res) {
  res.status(404).json({
    msg: 'Route not found'
  });
};

module.exports = {
  errorHandler: errorHandler,
  notFound: notFound
};
//# sourceMappingURL=errorHandler.dev.js.map
