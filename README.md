# 🛡️ Node.js Backend API with JWT Auth & MongoDB

A secure RESTful API built with **Express**, **TypeScript**, **MongoDB**, and **JWT authentication** (access + refresh tokens).

---

## 🚀 Features

- User registration and login
- Access and refresh token-based authentication
- Token refresh endpoint
- Protected routes using middleware
- Product CRUD operations (protected)
- MongoDB with Mongoose

---

## 🧱 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **JWT** (JSON Web Tokens)
- **bcryptjs** for password hashing
- **dotenv** for environment config

---

## 📦 Installation

```bash
git clone <your-repo-url>
cd backend
yarn install     # or npm install
```

⚙️ Environment Setup
Create a .env file in the root directory:

PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/products
ACCESS_TOKEN_SECRET=youraccesstokensecret
REFRESH_TOKEN_SECRET=yourrefreshtokensecret

🛠️ Run the Server
npm run dev

🧪 API Endpoints

🔐 Auth Routes (/api/auth)

Method Endpoint Description
POST /register Register a new user
POST /login Login with credentials
POST /refresh Get new access token

📦 Product Routes (/api/products)
All routes are protected using access tokens

Method Endpoint Description
GET / Get all products
GET /:id Get product by ID
POST / Create product
PUT /:id Update product
DELETE /:id Delete product

🔐 Auth Flow
Register/Login returns:

accessToken (expires in 15 minutes)

refreshToken (expires in 7 days)

Use accessToken in Authorization header:

Authorization: Bearer <accessToken>

src/
├── config/ # DB and environment config
├── controllers/ # Route handlers
├── middlewares/ # Authentication middleware
├── models/ # Mongoose models
├── routes/ # Route definitions
├── utils/ # Token utilities (JWT)
├── app.ts # Express app setup
└── server.ts # App entry point
