# ChatBotGeminiBackend

[![Node.js](https://img.shields.io/badge/Node.js-v16%2B-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.x-green.svg)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready Node.js backend service that powers intelligent conversational AI applications using Google's Gemini Generative AI API. Built with Express.js and MongoDB, it provides secure authentication, real-time chat capabilities, and persistent conversation management.

## 🚀 Features

### Core Functionality
- **🤖 Gemini AI Integration** - Seamless integration with Google's advanced Generative AI
- **🔐 JWT Authentication** - Secure user registration and login system
- **💾 Persistent Chat History** - Complete conversation storage and retrieval
- **🛡️ Security Middleware** - Request validation, rate limiting, and error handling
- **📊 RESTful API Design** - Clean, scalable endpoint architecture

### Technical Highlights
- **Scalable Architecture** - Modular design supporting horizontal scaling
- **Database Optimization** - Efficient MongoDB queries with Mongoose ODM
- **Environment Security** - Secure configuration management
- **Error Handling** - Comprehensive error tracking and logging
- **CORS Support** - Cross-origin resource sharing for frontend integration

## 🏗️ Architecture

### Project Structure
```
ChatBotGeminiBackend/
├── controllers/         # Business logic and request handlers
│   ├── authController.js
│   └── chatController.js
├── gemini/             # Gemini API service layer
│   └── geminiService.js
├── middlewares/        # Authentication and validation middleware
│   ├── auth.js
│   └── errorHandler.js
├── models/             # MongoDB schemas and models
│   ├── User.js
│   └── Chat.js
├── routes/             # API endpoint definitions
│   ├── auth.js
│   └── chat.js
├── utils/              # Helper functions and utilities
├── config/             # Database and service configurations
├── .env.example        # Environment variables template
├── server.js           # Application entry point
├── package.json        # Dependencies and scripts
└── README.md          # Project documentation
```

## 🛠️ Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Runtime** | Node.js | 16+ |
| **Framework** | Express.js | 4.x |
| **Database** | MongoDB | 5.x |
| **ODM** | Mongoose | 7.x |
| **Authentication** | JWT | Latest |
| **AI Service** | Google Gemini API | Latest |
| **Environment** | dotenv | Latest |

## 📋 Prerequisites

Before you begin, ensure you have:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local installation or Atlas cluster)
- [Google AI Studio](https://aistudio.google.com/) API key

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/asishadimulapu/ChatBotGeminiBackend.git
cd ChatBotGeminiBackend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/chatbot-gemini
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatbot-gemini

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_from_google_ai_studio

# CORS (optional)
FRONTEND_URL=http://localhost:3000
```

### 4. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Chat Endpoints

#### Send Message
```http
POST /api/chat/send
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "message": "Hello, how can you help me today?"
}
```

#### Get Chat History
```http
GET /api/chat/history?page=1&limit=20
Authorization: Bearer <jwt_token>
```

#### Update Message
```http
PUT /api/chat/:messageId
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "message": "Updated message content"
}
```

#### Delete Message
```http
DELETE /api/chat/:messageId
Authorization: Bearer <jwt_token>
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment mode | No | development |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `JWT_EXPIRES_IN` | Token expiration time | No | 7d |
| `GEMINI_API_KEY` | Google Gemini API key | Yes | - |
| `FRONTEND_URL` | CORS origin URL | No | http://localhost:3000 |

### Database Configuration

The application uses MongoDB with Mongoose ODM. Ensure your MongoDB instance is running and accessible.

#### Local MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or using Homebrew on macOS
brew services start mongodb-community
```

#### MongoDB Atlas
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get your connection string
3. Replace `<username>`, `<password>`, and `<cluster-url>` in your `.env` file

## 🚀 Deployment

### Production Setup

1. **Set Environment Variables**
```bash
export NODE_ENV=production
export PORT=80
export MONGODB_URI=your_production_mongodb_uri
export JWT_SECRET=your_production_jwt_secret
export GEMINI_API_KEY=your_gemini_api_key
```

2. **Using PM2 (Recommended)**
```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start server.js --name "chatbot-backend"

# Save PM2 configuration
pm2 save
pm2 startup
```

3. **Using Docker**
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Deployment Platforms
- **Heroku**: Supports automatic deployment from GitHub
- **AWS EC2**: Full control over server configuration
- **DigitalOcean**: Simple and cost-effective
- **Railway**: Modern deployment platform
- **Render**: Free tier available for small projects

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📊 Performance Considerations

- **Database Indexing**: Ensure proper indexes on frequently queried fields
- **Caching**: Implement Redis for session management and API response caching
- **Rate Limiting**: Configure appropriate rate limits to prevent abuse
- **Load Balancing**: Use nginx or similar for production load balancing
- **Monitoring**: Implement logging and monitoring (Winston, Morgan)

## 🔒 Security Best Practices

- **Environment Variables**: Never commit `.env` files
- **JWT Security**: Use strong secrets and appropriate expiration times
- **Input Validation**: Validate and sanitize all user inputs
- **CORS Configuration**: Restrict origins in production
- **Rate Limiting**: Implement API rate limiting
- **HTTPS**: Always use HTTPS in production

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Standards
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 Changelog

### [1.0.0] - 2024-12-01
- Initial release
- Gemini AI integration
- JWT authentication
- Chat history management
- MongoDB integration

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Check connection string format
mongodb://localhost:27017/database_name
```

**Gemini API Rate Limiting**
- Ensure you have valid API quota
- Implement proper error handling for rate limits
- Consider request queuing for high-traffic applications

**JWT Token Issues**
- Verify JWT_SECRET is set correctly
- Check token expiration settings
- Ensure proper token format in requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Asish Adimulapu**
- GitHub: [@asishadimulapu](https://github.com/asishadimulapu)
- LinkedIn: [Asish Adimulapu](https://linkedin.com/in/asishadimulapu)
- Email: asish.adimulapu@example.com

## 🙏 Acknowledgments

- Google AI team for the Gemini API
- MongoDB team for excellent database solutions
- Express.js community for the robust framework
- All contributors and supporters of this project

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/asishadimulapu/ChatBotGeminiBackend/issues) page
2. Create a new issue with detailed information
3. Join our community discussions
4. Contact the maintainer directly

---

⭐ **Star this repository if it helped you!**
