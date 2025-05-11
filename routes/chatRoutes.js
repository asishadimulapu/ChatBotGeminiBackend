const express = require('express');
const auth = require('../middlewares/authMiddleware');
const {
  createChat,
  getChats,
  deleteChat
} = require('../controllers/chatController');

const router = express.Router();

router.post('/', auth, createChat);
router.get('/', auth, getChats);
router.delete('/:id', auth, deleteChat);

module.exports = router;
