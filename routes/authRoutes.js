const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middlewares/validation');
const { authLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

// Apply auth rate limiting to all routes
router.use(authLimiter);

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

module.exports = router;
