"use strict";

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult; // Validation middleware to check for errors


var handleValidationErrors = function handleValidationErrors(req, res, next) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: 'Validation failed',
      errors: errors.array()
    });
  }

  next();
}; // User registration validation


var validateRegistration = [body('name').trim().isLength({
  min: 2,
  max: 50
}).withMessage('Name must be between 2 and 50 characters'), body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'), body('password').isLength({
  min: 8
}).withMessage('Password must be at least 8 characters long').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'), handleValidationErrors]; // User login validation

var validateLogin = [body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'), body('password').notEmpty().withMessage('Password is required'), handleValidationErrors]; // Chat prompt validation

var validateChatPrompt = [body('prompt').trim().isLength({
  min: 1,
  max: 1000
}).withMessage('Prompt must be between 1 and 1000 characters'), handleValidationErrors];
module.exports = {
  validateRegistration: validateRegistration,
  validateLogin: validateLogin,
  validateChatPrompt: validateChatPrompt,
  handleValidationErrors: handleValidationErrors
};
//# sourceMappingURL=validation.dev.js.map
