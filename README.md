# 🎯 AI Interview Prep Platform

An AI-powered web application that allows users to **sign up, log in**, and generate **customized interview questions** using **Gemini AI**. Built with a **React.js frontend**, **Node.js/Express.js backend**, and **MongoDB database**, this app helps users **prepare for technical and behavioral interviews** efficiently.

---

## 🚀 Features

- 🔐 User Authentication (Signup / Login)
- 🧠 AI-Powered Interview Question Generation via Gemini AI
- 🗂️ Role or Topic-Based Question Customization
- 📋 User Dashboard to View/Manage Previous Questions
- 💾 MongoDB Database Integration
- ⚡ Fast, responsive UI built with React

---

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|--------------------------|
| Frontend   | React.js |
| Backend    | Node.js, Express.js      |
| AI Engine  | Gemini AI (Google AI)    |
| Auth       | JWT + bcrypt             |
| Database   | MongoDB (Mongoose ODM)   |

---

## 📦 Installation

### 1. Clone the Repository

git clone (https://github.com/Pooja-Sharma1234/Ace-My-Interview.git)

2. Set Up the Backend

cd backend
npm install

Start the backend server:
npm start

3. Set Up the Frontend

cd frontend
npm install
npm start



🧠 How It Works
User signs up or logs in using dummy credentials - test21@gmail.com, password:test20123

User can generate there interview prep questions by clicking on "Add New" button

They choose a job role or topic (e.g., "Frontend Developer", "System Design").

Gemini AI generates a list of smart, targeted questions.

user can bookmark questions ,can generate comprehensive explanation by clicking on learn more

user can generate more practice questions by clicking on load more



🔐 Authentication & Security
Passwords are hashed using bcrypt.

JWT tokens are used for secure session handling.

MongoDB stores user data and saved question sessions.



👤 Author
Pooja Sharma
GitHub • LinkedIn - https://www.linkedin.com/in/pooja-sharma-ps7539/


