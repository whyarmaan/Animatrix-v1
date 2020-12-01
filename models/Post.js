const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  Author: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      username: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
});

const PostModel = mongoose.model("Post", PostSchema);
module.exports = PostModel;
