# 🤖 ChatGPT Backend

A backend API for a ChatGPT-style application built with **Node.js, Express, MongoDB, Redis, JWT authentication, and OpenRouter**.

This project focuses on building a structured backend with separate routes, controllers, services, models, middleware, validation, caching, and external AI integration.

## 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Redis**
* **JWT**
* **bcrypt**
* **Zod**
* **OpenRouter SDK**
* **Google GenAI**
* **Cookie Parser**

## 🏗️ Project Structure

```text
chatgpt-backend/
│
├── config/
│   ├── database.js
│   ├── openRouter.js
│   └── redis.js
│
├── controller/
│   ├── chatController.js
│   ├── messageController.js
│   └── userController.js
│
├── middlewares/
│   └── authUserMiddleware.js
│
├── model/
│   ├── chatschema.js
│   ├── messageschema.js
│   └── userSchema.js
│
├── routes/
│   ├── ChatRouter.js
│   ├── messagerRouter.js
│   └── userRoute.js
│
├── services/
│   ├── openRouterService.js
│   └── summary.js
│
├── utils/
│   ├── chatContext.js
│   ├── tokenUsage.js
│   └── userUsage.js
│
├── validators/
│   └── userValidator.js
│
├── tester/
│
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

## ✨ Features

### Authentication & Users

* User authentication
* JWT-based authorization
* Password hashing with bcrypt
* User validation using Zod
* Cookie-based request handling
* User-related APIs

### Chat System

* Chat API
* Message API
* Chat and message data models
* Chat context management
* Conversation summarization

### AI Integration

* OpenRouter API integration
* AI service layer
* External AI model communication

### Backend Infrastructure

* MongoDB database
* Redis integration
* Token usage tracking
* User usage tracking
* Controller/service separation
* Authentication middleware

## 🔄 Backend Architecture

The application follows a layered backend structure:

```text
Client
   │
   ▼
Express Route
   │
   ▼
Controller
   │
   ▼
Service
   │
   ├── MongoDB
   ├── Redis
   └── OpenRouter
```

Authentication and validation are handled through middleware/validation layers.

## 📡 API Routes

The current application registers these route groups:

```text
/user
/msg
/chat
```

### User

```text
/user/...
```

Handles user-related operations such as authentication and user management.

### Messages

```text
/msg/...
```

Handles message-related operations.

### Chats

```text
/chat/...
```

Handles chat-related operations.

> Individual endpoints may change as development continues.

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
```

Never commit your `.env` file or API keys to GitHub.

The project already ignores `.env` through `.gitignore`.

## 🛠️ Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project:

```bash
cd chatgpt-backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure the required environment variables.

Start the server:

```bash
node index.js
```

The server will connect to:

```text
MongoDB
   ↓
Redis
   ↓
Express Server
```

## 🧠 What I Learned

Building this project helped me work with:

* Production-style Express project structure
* Route → Controller → Service architecture
* JWT authentication
* Password hashing
* MongoDB and Mongoose
* Redis
* External AI API integration
* Chat context management
* Token usage tracking
* Request validation with Zod
* Middleware
* Environment variable management
* Separating business logic from controllers

## 🔮 Future Improvements

* AI response streaming
* Refresh-token authentication
* Rate limiting
* Improved error handling and logging
* Automated testing
* Swagger/OpenAPI documentation
* Dockerization
* Production deployment
* Improved conversation search and management

## 👨‍💻 Author

**Pranav Sharma**

B.Tech CS | Backend & MERN Developer | Competitive Programming Learner

Building projects, learning backend engineering, and improving problem-solving skills.
