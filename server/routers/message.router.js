const express = require("express");
const router = express.Router();

const { getUsersForSidebar,setMessage,getMessage } = require("../controllers/message.controller");
const { protectedRoute } = require("../middlewares/auth");

router.get("/users", protectedRoute, getUsersForSidebar);
router.get("/:id", protectedRoute, getMessage);
router.post("/send/:id", protectedRoute, setMessage);   
module.exports = router;
