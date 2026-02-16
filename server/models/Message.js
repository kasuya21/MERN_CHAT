const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: { type: String, required: true },
    message: { type: String, default: null },
    image: { type: String, default: null },
    read: { type: Boolean },
  },
  { timestamps: true },
);

// model
const MessageModel = model("Message", messageSchema);
module.exports = MessageModel;
