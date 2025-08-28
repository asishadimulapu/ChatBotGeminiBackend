"use strict";

var Chat = require('../models/Chat');

var _require = require('../gemini/geminiClient'),
    askGemini = _require.askGemini,
    validateInput = _require.validateInput;

exports.createChat = function _callee(req, res, next) {
  var prompt, validatedPrompt, response, chat;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          prompt = req.body.prompt; // Validate input

          validatedPrompt = validateInput(prompt); // Get response from Gemini

          _context.next = 5;
          return regeneratorRuntime.awrap(askGemini(validatedPrompt));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(Chat.create({
            userId: req.userId,
            prompt: validatedPrompt,
            response: response
          }));

        case 8:
          chat = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(chat.populate('userId', 'name email'));

        case 11:
          res.status(201).json(chat);
          _context.next = 19;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);

          if (!(_context.t0.message.includes('Input') || _context.t0.message.includes('characters'))) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            msg: _context.t0.message
          }));

        case 18:
          next(_context.t0); // Pass other errors to error handling middleware

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.getChats = function _callee2(req, res, next) {
  var page, limit, skip, chats, totalChats, totalPages, _chats;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Check if pagination is requested
          page = parseInt(req.query.page);
          limit = parseInt(req.query.limit);

          if (!(page && limit)) {
            _context2.next = 15;
            break;
          }

          // Paginated response
          skip = (page - 1) * limit; // Get chats with pagination

          _context2.next = 7;
          return regeneratorRuntime.awrap(Chat.find({
            userId: req.userId
          }).sort({
            createdAt: -1
          }).skip(skip).limit(limit).populate('userId', 'name email'));

        case 7:
          chats = _context2.sent;
          _context2.next = 10;
          return regeneratorRuntime.awrap(Chat.countDocuments({
            userId: req.userId
          }));

        case 10:
          totalChats = _context2.sent;
          totalPages = Math.ceil(totalChats / limit);
          res.json({
            chats: chats,
            pagination: {
              currentPage: page,
              totalPages: totalPages,
              totalChats: totalChats,
              hasNextPage: page < totalPages,
              hasPrevPage: page > 1
            }
          });
          _context2.next = 19;
          break;

        case 15:
          _context2.next = 17;
          return regeneratorRuntime.awrap(Chat.find({
            userId: req.userId
          }).sort({
            createdAt: -1
          }).limit(50) // Limit to prevent too much data
          .populate('userId', 'name email'));

        case 17:
          _chats = _context2.sent;
          res.json(_chats);

        case 19:
          _context2.next = 24;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0); // Pass error to error handling middleware

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 21]]);
};

exports.deleteChat = function _callee3(req, res, next) {
  var chatId, deletedChat;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          chatId = req.params.id; // Ensure user can only delete their own chats

          _context3.next = 4;
          return regeneratorRuntime.awrap(Chat.findOneAndDelete({
            _id: chatId,
            userId: req.userId
          }));

        case 4:
          deletedChat = _context3.sent;

          if (deletedChat) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            msg: 'Chat not found or unauthorized'
          }));

        case 7:
          res.json({
            msg: 'Chat deleted successfully'
          });
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0); // Pass error to error handling middleware

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};
//# sourceMappingURL=chatController.dev.js.map
