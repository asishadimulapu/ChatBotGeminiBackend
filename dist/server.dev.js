"use strict";

var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

var dotenv = require('dotenv');

var helmet = require('helmet'); // Load environment variables first


dotenv.config(); // Import utilities and middlewares

var _require = require('./utils/envValidator'),
    validateEnvironment = _require.validateEnvironment;

var _require2 = require('./middlewares/errorHandler'),
    errorHandler = _require2.errorHandler,
    notFound = _require2.notFound;

var _require3 = require('./middlewares/rateLimiter'),
    generalLimiter = _require3.generalLimiter; // Import routes


var authRoutes = require('./routes/authRoutes');

var chatRoutes = require('./routes/chatRoutes'); // Validate environment variables before starting


validateEnvironment();
var app = express(); // Security middlewares

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
})); // CORS configuration - restrict in production

var corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? ['https://chat-bot-gemini-frontend.vercel.app', 'https://chat-bot-gemini-frontend-662zruhd3-asishadimulapus-projects.vercel.app', process.env.CORS_ORIGIN] : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); // Rate limiting

app.use(generalLimiter); // Body parsing middleware

app.use(express.json({
  limit: '10mb'
}));
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
})); // API routes

app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes); // Root route

app.get('/', function (req, res) {
  res.status(200).json({
    message: 'ChatBot API Server is running! 🤖',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      chats: '/api/chats',
      health: '/health'
    }
  });
}); // Health check endpoint

app.get('/health', function (req, res) {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
}); // 404 handler

app.use(notFound); // Global error handler

app.use(errorHandler); // MongoDB connection with proper error handling

var connectDB = function connectDB() {
  var conn;
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 3:
          conn = _context.sent;
          console.log("\u2705 MongoDB Connected: ".concat(conn.connection.host));
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('❌ MongoDB connection error:', _context.t0.message);
          process.exit(1);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Graceful shutdown


process.on('SIGINT', function _callee() {
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('\n🔄 Shutting down gracefully...');
          _context2.next = 3;
          return regeneratorRuntime.awrap(mongoose.connection.close());

        case 3:
          console.log('✅ MongoDB connection closed');
          process.exit(0);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Start server

var startServer = function startServer() {
  var PORT;
  return regeneratorRuntime.async(function startServer$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(connectDB());

        case 2:
          PORT = process.env.PORT || 5000;
          app.listen(PORT, function () {
            console.log("\uD83D\uDE80 Server running on port ".concat(PORT));
            console.log("\uD83C\uDF0D Environment: ".concat(process.env.NODE_ENV || 'development'));
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

startServer();
//# sourceMappingURL=server.dev.js.map
