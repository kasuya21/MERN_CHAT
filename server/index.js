const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
dotenv.config();
const { app, server } = require("./lib/socket");

// routers
const userRouter = require("./routers/user.router");
const messageRouter = require("./routers/message.router");

const PORT = process.env.PORT;
const corsOrigins = process.env.CLIENT_URL;
const DB_URL = process.env.DB_URL;

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Chat API is running" });
});

if (!DB_URL) {
  console.error("DB_URL is missing. Please set it in your .enf file");
} else {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error.message);
    });
}

app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

// คอยรับฟังสัญญาณ
server.listen(PORT, () => console.log(`Server is running port ${PORT}`));
