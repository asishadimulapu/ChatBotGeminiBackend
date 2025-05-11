"use strict";

var Chat = require('../models/Chat');

var _require = require('../gemini/geminiClient'),
    askGemini = _require.askGemini;

exports.createChat = function _callee(req, res) {
  var prompt, response, newChat;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          prompt = req.body.prompt;

          if (prompt) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Prompt is required'
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(askGemini(prompt));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(Chat.create({
            userId: req.user._id,
            prompt: prompt,
            response: response
          }));

        case 9:
          newChat = _context.sent;
          res.status(201).json(newChat); // ✅ send full chat back to frontend

          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error('createChat error:', _context.t0.message);
          res.status(500).json({
            message: _context.t0.message || 'Failed to process chat'
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};
//# sourceMappingURL=geminiClient.dev.js.map
