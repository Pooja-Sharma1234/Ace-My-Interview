require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionsRoutes = require("./routes/questionRoutes");
const { stringify } = require("querystring");
const { protect } = require("./middlewares/authMiddlewares");
const {
  generateInterviewQuestions,
  generateConceptExplanations,
} = require("./controllers/aiController");
const app = express();

//Middleware to handle CORS

app.use(
  cors({
    origin: "*", //koi bhi acess kr saken
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();
//MIDDLEWARE

app.use(express.json());

//ROUTES

app.use("/api/auth", authRoutes); // prefix- /api/auth/
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionsRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanations", protect, generateConceptExplanations);

//Server uploads folder

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

//start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
