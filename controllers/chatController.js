const Chat = require('../models/Chat');
const { askGemini, validateInput } = require('../gemini/geminiClient');

exports.createChat = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    
    // Validate input
    const validatedPrompt = validateInput(prompt);
    
    // Get response from Gemini
    const response = await askGemini(validatedPrompt);

    // Create chat entry
    const chat = await Chat.create({
      userId: req.userId,
      prompt: validatedPrompt,
      response
    });

    // Populate user info if needed
    await chat.populate('userId', 'name email');

    res.status(201).json(chat);
  } catch (err) {
    // Handle validation errors specifically
    if (err.message.includes('Input') || err.message.includes('characters')) {
      return res.status(400).json({ msg: err.message });
    }
    next(err); // Pass other errors to error handling middleware
  }
};

exports.getChats = async (req, res, next) => {
  try {
    // Check if pagination is requested
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    
    if (page && limit) {
      // Paginated response
      const skip = (page - 1) * limit;

      // Get chats with pagination
      const chats = await Chat.find({ userId: req.userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'name email');

      // Get total count for pagination info
      const totalChats = await Chat.countDocuments({ userId: req.userId });
      const totalPages = Math.ceil(totalChats / limit);

      res.json({
        chats,
        pagination: {
          currentPage: page,
          totalPages,
          totalChats,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      });
    } else {
      // Simple response for backward compatibility
      const chats = await Chat.find({ userId: req.userId })
        .sort({ createdAt: -1 })
        .limit(50) // Limit to prevent too much data
        .populate('userId', 'name email');
      
      res.json(chats);
    }
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

exports.deleteChat = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    
    // Ensure user can only delete their own chats
    const deletedChat = await Chat.findOneAndDelete({ 
      _id: chatId, 
      userId: req.userId 
    });

    if (!deletedChat) {
      return res.status(404).json({ msg: 'Chat not found or unauthorized' });
    }

    res.json({ msg: 'Chat deleted successfully' });
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};
