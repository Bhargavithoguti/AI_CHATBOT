const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const {
  generateAIReply,
} = require("../services/geminiService");

// Create a new chat
const createChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    // Generate AI reply
    const reply = await generateAIReply(message);

    const db = getDB();

    const newChat = {
      userId: req.user.userId,
      message,
      reply,
      createdAt: new Date(),
    };

    const result = await db.collection("chats").insertOne(newChat);

    res.status(201).json({
      message: "Chat created successfully",
      chat: {
        id: result.insertedId,
        ...newChat,
      },
    });
  } catch (error) {
    console.error("Create chat error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get logged-in user's chat history
const getUserChats = async (req, res) => {
  try {
    const db = getDB();

    const chats = await db
      .collection("chats")
      .find({
        userId: req.user.userId,
      })
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      chats,
    });
  } catch (error) {
    console.error("Get chats error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete logged-in user's chat
const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid chat ID",
      });
    }

    const db = getDB();

    const result = await db.collection("chats").deleteOne({
      _id: new ObjectId(id),
      userId: req.user.userId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    res.json({
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.error("Delete chat error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createChat,
  getUserChats,
  deleteChat,
};