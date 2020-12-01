const userModel = require("../models/User");
const User = require("../models/User");
module.exports = (req, res, next) => {
  User.findById(req.userID)
    .then((user) => {
      if (user) {
        if (user.isMod) {
          next();
        } else {
          res.status(401).json({
            message: "Unauthorized Hehehe You Aint Mod :pikapika:",
          });
        }
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        _message: "Something Bad Happened In The Back Somry",
      });
    });
};
