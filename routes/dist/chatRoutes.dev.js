"use strict";

var express = require('express');

var auth = require('../middlewares/authMiddleware');

var _require = require('../controllers/chatController'),
    createChat = _require.createChat,
    getChats = _require.getChats,
    deleteChat = _require.deleteChat;

var router = express.Router();
router.post('/', auth, createChat);
router.get('/', auth, getChats);
router["delete"]('/:id', auth, deleteChat);
module.exports = router;
//# sourceMappingURL=chatRoutes.dev.js.map
