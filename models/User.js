const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Posts",
    },
  ],
  isMod: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  resetPassTok: {
    type: String,
    default: "",
  },
  resetPassUsed: {
    type: Boolean,
    default: false,
  },
  resetPassExp: {
    type: Number,
    default: Date.now(),
  },
  bannedTill: {
    type: Number,
  },
});
const userModel = mongoose.model("Users", UserSchema);
module.exports = userModel;
