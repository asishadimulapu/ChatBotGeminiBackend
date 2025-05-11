const Chat = require('../models/Chat');
const { askGemini } = require('../gemini/geminiClient');

exports.createChat = async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await askGemini(prompt);

    const chat = await Chat.create({
      userId: req.userId,
      prompt,
      response
    });

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    await Chat.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ msg: 'Chat deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
