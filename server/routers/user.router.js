const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  updateProfile,
  checkAuth,
} = require("../controllers/user.controller");
const { protectedRoute } = require("../middlewares/auth");

// http://localhost:5000/api/v1/user/register
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectedRoute, updateProfile);
router.get("/check", protectedRoute, checkAuth);

module.exports = router;
