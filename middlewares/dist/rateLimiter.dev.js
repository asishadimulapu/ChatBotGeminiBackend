"use strict";

var rateLimit = require('express-rate-limit'); // General API rate limiting


var generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  max: 100,
  // limit each IP to 100 requests per windowMs
  message: {
    msg: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
}); // Auth endpoints rate limiting (stricter)

var authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  max: 5,
  // limit each IP to 5 login attempts per windowMs
  message: {
    msg: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
}); // Chat endpoints rate limiting

var chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  // 1 minute
  max: 10,
  // limit each IP to 10 chat requests per minute
  message: {
    msg: 'Too many chat requests, please slow down.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
module.exports = {
  generalLimiter: generalLimiter,
  authLimiter: authLimiter,
  chatLimiter: chatLimiter
};
//# sourceMappingURL=rateLimiter.dev.js.map
