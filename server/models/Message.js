const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recipientId: { type: mongoose.Schema.Types.ObjectId , ref:"User" },
    text: { type: String},
    file: { type: String},
    
  },
  { timestamps: true },
);

// model
const MessageModel = model("Message", messageSchema);
module.exports = MessageModel;
