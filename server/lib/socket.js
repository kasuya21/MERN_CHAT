require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server,{
    cors:{
        origin:[process.env.CLIENT_URL],
    }
});
const userSocketMap = {}; // {userId:socketId}

// หน้าบ้านรู้จัก userID
// หลังบ้านรู้จัก socketId

// รับ user ID
function getReceiverSocketId(userId) {
  // จะ return socketID ออกไป
  return userSocketMap[userId];
}

// เมื่อเกิด eveent connection ให้ทำ call back function
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  const userId = socket.handshake.query.userId;
  //   เราจะจับคู่
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("UserSocketMap", userSocketMap);
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete userSocketMap[userId];
    console.log("UserSocketMap", userSocketMap);
  });
});

module.exports = { io, app, server };
