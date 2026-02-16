const MessageModel = require("../models/Message");

const getMessages = async (req, res) => {
  try {
    const { room } = req.params;
    const messages = await MessageModel.find({ room })
      .sort({ createdAt: 1 })
      .limit(100);

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { room } = req.params;
    await MessageModel.updateMany(
      { room, read: false },
      { $set: { read: true } },
    );
    res.json({ message: "Messages marked as read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getMessages,
  markAsRead,
};
