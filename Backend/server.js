require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { connectDB } = require("./config/db");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local frontend
      "https://ai-chatbot-eta-eight-51.vercel.app", // Deployed frontend
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user,
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "AI Chatbot API is running",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
};

startServer();