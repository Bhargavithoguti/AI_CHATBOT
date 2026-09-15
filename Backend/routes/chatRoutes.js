const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createChat,
  getUserChats,
  deleteChat,
} = require("../controllers/chatController");

const router = express.Router();

// Create a new chat
router.post(
  "/",
  authMiddleware,
  createChat
);

// Get logged-in user's chat history
router.get(
  "/",
  authMiddleware,
  getUserChats
);

// Delete logged-in user's chat
router.delete(
  "/:id",
  authMiddleware,
  deleteChat
);

module.exports = router;