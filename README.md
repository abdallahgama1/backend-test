# Project Structure & Environment Configuration

## 1. Project Structure

The project is organized into different challenges, each placed inside a separate folder. Below is an overview of the structure:

```
📂 project-root
├── 📂 challenge-1
├── ├── 📂 backend
│   ├── ├── 📂 controllers        # API controllers
│   ├── ├── 📂 middleware         # Middleware functions
│   ├── ├── 📂 models             # Database models
│   ├── ├── 📂 routes             # Express routes
│   ├── ├── 📂 validators         # Input validation rules
│   ├── ├── 📄 server.js          # Express server setup
│   ├── 📄 package.json       # Dependencies and scripts
│   ├── 📄 README.md          # Documentation for Challenge 1
│
├── 📂 challenge-2
│   └── 📄 README.md          # Documentation for Challenge 2

└── 📄 README.md              # Main project documentation
```

## 2. Environment Configuration

Each challenge and the main project require a `.env` file to manage sensitive configuration settings. Below is how you can set up your `.env` file:

### **Steps to Set Up .env**

1. **Create a `.env` file** in the root of each challenge folder if it does not exist.
2. **Add the required environment variables** following the example below.
3. **Ensure that `.env` is included in `.gitignore`** to prevent sensitive data from being pushed to a repository.

### **Example .env File:**
```env
# Server Configuration
PORT=5000

# Database Configuration
MONGO_URI=mongodb+srv://dummy:23A9HbkOjhU6fXQI@cluster0.mzv4i.mongodb.net/?retryWrites=true&w=majority&appName=Netway-Corp 

# JWT Configuration
JWT_SECRET=your_secret_key_here

# Other Configuration
NODE_ENV=development
```

### **Accessing Environment Variables in Code**
In your application, use `process.env` to access environment variables:
```javascript
import dotenv from 'dotenv';
dotenv.config();

console.log("Database URI:", process.env.MONGO_URI);
```

This setup ensures that each challenge is modular and can be configured independently while following best practices for environment management. 🚀
