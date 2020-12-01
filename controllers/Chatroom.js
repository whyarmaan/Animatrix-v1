const Chatroom = require("../models/Chatroom");

exports.postNew = (req, res, next) => {
  const { name } = req.body;
  const newRoom = new Chatroom({
    name,
    admin: req.userID,
  });
  newRoom
    .save()
    .then((doc) => {
      res.json({
        message: "Room Created",
        doc,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        _message: "Something bad happened",
      });
    });
};

exports.getAll = (req, res, next) => {
  Chatroom.find()
    .then((docs) => res.json({ docs }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ _message: "Something Bad Happened" });
    });
};
