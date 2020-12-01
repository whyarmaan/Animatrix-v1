const User = require("../models/User");

exports.postBan = (req, res, next) => {
  const { UserID, banTill } = req.body;
  User.findById(UserID)
    .then((doc) => {
      if (doc.isMod) {
        return res.json({
          message:
            "Bruh You Cant Ban A Mod! Try Contacting The Admin If There Is Something Wrong!",
        });
      }
      doc.isBanned = true;
      doc.bannedTill = Date.now() + banTill * 86400000;
      doc
        .save()
        .then((newDoc) => {
          return res.json({
            message: `|${newDoc.username}| is Now {Banned: ${newDoc.isBanned}}`,
          });
        })
        .catch((err) => {
          console.error(err);
          return res.status(401).json({ err, message: "[DB] Error" });
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).json({ err, message: "[DB] Error" });
    });
};
