const MessageModel = require("../models/Message");
const User = require("../models/User");
const cloudinary = require("../configs/cloudinary");

const { getReceiverSocketId, io } = require("../lib/socket");

exports.getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error while getting users info" });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChat } = req.params;
    const messages = await MessageModel.find({
      $or: [
        {
          senderId: myId,
          recipientId: userToChat,
        },
        {
          senderId: userToChat,
          recipientId: myId,
        },
      ],
    });
    res.json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error while getting message" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { id: recipientId } = req.params;
    if (!recipientId) {
      return res.status(400).json({ message: "Recipient Id is missing" });
    }
    const senderId = req.user._id;
    const { text, file } = req.body;
    let fileUrl = "";
    if (file) {
      const uploadResponse = await cloudinary.uploader.upload(file);
      fileUrl = uploadResponse.secure_url;
    }
    const newMessage = await new MessageModel({
      senderId,
      recipientId,
      text,
      file: fileUrl,
    });

    await newMessage.save();

    // Send signal to recipient via socket
    const receiverSocketId = getReceiverSocketId(recipientId.toString());
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.json(newMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error while sending message" });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const userId = req.user._id;

    const message = await MessageModel.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Only sender can delete their message
    if (String(message.senderId) !== String(userId)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this message" });
    }

    await MessageModel.findByIdAndDelete(messageId);

    // Notify receiver via socket
    const receiverSocketId = getReceiverSocketId(message.recipientId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", { messageId });
    }

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error while deleting message" });
  }
};
