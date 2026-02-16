const express = require("express");
const router = express.Router();

const  {protectedRoute}  = require("../middlewares/auth")

const { register, login, logout,updateProfile } = require("../controllers/user.controller");

// http://localhost:5000/api/v1/user/register
router.post("/register", register);
router.post("/login", login);
router.post("/logout",logout)
router.put('/update-profile',protectedRoute,updateProfile)

module.exports = router;
