"use strict";

var express = require('express');

var auth = require('../middlewares/authMiddleware');

var _require = require('../middlewares/validation'),
    validateChatPrompt = _require.validateChatPrompt;

var _require2 = require('../middlewares/rateLimiter'),
    chatLimiter = _require2.chatLimiter;

var _require3 = require('../controllers/chatController'),
    createChat = _require3.createChat,
    getChats = _require3.getChats,
    deleteChat = _require3.deleteChat;

var router = express.Router(); // Apply auth middleware to all routes

router.use(auth); // Apply chat rate limiting to all routes

router.use(chatLimiter);
router.post('/', validateChatPrompt, createChat);
router.get('/', getChats);
router["delete"]('/:id', deleteChat);
module.exports = router;
//# sourceMappingURL=chatRoutes.dev.js.map
