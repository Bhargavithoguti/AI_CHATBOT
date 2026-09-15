const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAdminStats,
  getAllUsers,
  deleteUser,
} = require("../controllers/adminController");

const router = express.Router();

// Admin statistics
router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getAdminStats
);

// Get all users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

// Delete user
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

// Admin test route
router.get(
  "/test",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      message: "Admin route is working",
      user: req.user,
    });
  }
);

module.exports = router;