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
    const {id:userToChat} = req.params;
    const message = await MessageModel.find({
      $or:[
        {
          sender:myId,
          recipient: userToChat,
        },
        {
          sender: userToChat,
          recipient: myId
        }
      ]
    })
    res.json(message)
  } catch (error){
    res.status(500).json({message})
  }
};
exports.setMessage = async (req,res) => {
  try {
    const {id: recipient} = req.params
    if (!recipient){
      return res.status(400).json({message})
    }
    const senderId = req.user._id
    const {text,file}=req.body
    let fileUrl=""
    if(file){
      const uploadResponse = await cloudinary.uploader.upload(file);
      fileUrl = uploadResponse.secure_url;
    }
    const newMessage = await MessageModel({
      senderId,
      recipientId: recipient, 
      text,
      file: fileUrl
    });
    await newMessage.save()
    res.send(newMessage)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
