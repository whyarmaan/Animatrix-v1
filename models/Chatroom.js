const mongoose = require("mongoose");
const chatRoomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  messages: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
      },
      message: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
});

const model = mongoose.model("ChatRoom", chatRoomSchema);
module.exports = model;
