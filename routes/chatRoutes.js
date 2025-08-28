const express = require('express');
const auth = require('../middlewares/authMiddleware');
const { validateChatPrompt } = require('../middlewares/validation');
const { chatLimiter } = require('../middlewares/rateLimiter');
const {
  createChat,
  getChats,
  deleteChat
} = require('../controllers/chatController');

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// Apply chat rate limiting to all routes
router.use(chatLimiter);

router.post('/', validateChatPrompt, createChat);
router.get('/', getChats);
router.delete('/:id', deleteChat);

module.exports = router;
