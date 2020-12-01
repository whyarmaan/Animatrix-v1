const Post = require("../models/Post");
const User = require("../models/User");

exports.postNew = (req, res, next) => {
  const { title, content } = req.body;
  console.log(req.userID)
  console.log(req.userID)
  User.findOne({ _id: req.userID })
    .then((doc) => {
      if (doc) {
        console.log(doc)
        const post = new Post({ title, content, Author: doc._id });
        return post.save();
      } else {
        return res.json({
          message:
            "Invalid User, If You Are'nt A Bot Please SignIn Once Again!",
        });
      }
    })
    .then((savedDoc) => {
      res.json({ savedDoc });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        _message: "Internal Server Error Occured!"
      })
    });
};

exports.getPosts = (req, res, next) => {
    Post.find().then(docs => {
        res.json({ docs })
    }).catch(err => {
        console.error(err);
    });
}
