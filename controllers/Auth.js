const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { CONSTANTS } = require("../config");

exports.postSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  let hashedPswd;
  try {
    hashedPswd = await bcrypt.hash(password, CONSTANTS.SALTS || 10);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      _message: "Internal Server Error",
    });
  }

  const user = new User({
    username,
    email,
    password: hashedPswd,
  });
  user
    .save()
    .then((doc) => {
      const accessToken = jwt.sign(
        {
          id: doc._id,
        },
        CONSTANTS.JWTSTRING,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        {
          id: doc._id,
          accessToken,
        },
        CONSTANTS.JWTSTRING,
        { expiresIn: "1y" }
      );
      res.json({
        accessToken,
        refreshToken,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        _message: "Internal Server Error",
      });
    });
};

exports.postSignin = (req, res, next) => {
  const { username, password } = req.body;
  console.log(password);
  let doc;
  User.findOne({ username })
    .then((doc) => {
      doc = doc;
      return bcrypt
        .compare(password, doc.password)
        .then((result) => {
          if (result) {
            const accessToken = jwt.sign(
              {
                id: doc._id,
              },
              CONSTANTS.JWTSTRING,
              { expiresIn: "1h" }
            );
            const refreshToken = jwt.sign(
              {
                id: doc._id,
                accessToken,
              },
              CONSTANTS.JWTSTRING,
              { expiresIn: "1y" }
            );
            res.json({ accessToken, refreshToken });
          } else {
            return res.status(401).json({
              message: "Unauthorized",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        _message: "Internal Server Error!",
      });
    });
};
