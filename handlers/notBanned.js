const User = require("../models/User");

module.exports = (req, res, next) => {
  const { UserID } = req;
  User.findById(UserID)
    .then((doc) => {
      if (doc.bannedTill < Date.now()) {
        doc.isBanned = false;
        doc
          .save()
          .then((newDoc) => {
            return next();
          })
          .catch((err) => {
            console.error(err);
            return res.status(300).json({
              err: "Something Bad Happened",
            });
          });
      }
      if (doc.isBanned) {
        return res.status(401).json({
          _message: "Bruh You Are Banned!",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
