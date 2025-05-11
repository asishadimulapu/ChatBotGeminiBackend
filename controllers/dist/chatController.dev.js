"use strict";

var Chat = require('../models/Chat');

var _require = require('../gemini/geminiClient'),
    askGemini = _require.askGemini;

exports.createChat = function _callee(req, res) {
  var prompt, response, chat;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          prompt = req.body.prompt;
          _context.next = 4;
          return regeneratorRuntime.awrap(askGemini(prompt));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(Chat.create({
            userId: req.userId,
            prompt: prompt,
            response: response
          }));

        case 7:
          chat = _context.sent;
          res.status(201).json(chat);
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            msg: _context.t0.message
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getChats = function _callee2(req, res) {
  var chats;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Chat.find({
            userId: req.userId
          }).sort({
            createdAt: -1
          }));

        case 3:
          chats = _context2.sent;
          res.json(chats);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            msg: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.deleteChat = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Chat.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
          }));

        case 3:
          res.json({
            msg: 'Chat deleted'
          });
          _context3.next = 9;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            msg: _context3.t0.message
          });

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
};
//# sourceMappingURL=chatController.dev.js.map
