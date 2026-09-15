const { getDB } = require("../config/db");

// Get admin statistics
const getAdminStats = async (req, res) => {
  try {
    const db = getDB();

    const usersCount = await db.collection("users").countDocuments();
    const chatsCount = await db.collection("chats").countDocuments();

    res.json({
      users: usersCount,
      chats: chatsCount,
    });
  } catch (error) {
    console.error("Admin stats error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const db = getDB();

    const users = await db
      .collection("users")
      .find({})
      .project({
        password: 0,
      })
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      users,
    });
  } catch (error) {
    console.error("Get users error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { ObjectId } = require("mongodb");
    const db = getDB();

    const result = await db.collection("users").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getAdminStats,
  getAllUsers,
  deleteUser,
};