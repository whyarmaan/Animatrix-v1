const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { v4: uuid } = require("uuid");
const { postEmail } = require("../Emails/email");
const { CONSTANTS } = require("../config");

exports.postReset = (req, res, next) => {
  const { UserID } = req.body;
  User.findById(UserID)
    .then((doc) => {
      const { email } = doc;
      const hash = uuid();
      doc.resetPassTok = hash;
      doc.resetPassExp = Date.now() + 60000 * 10;
      doc.resetPassUsed = false;
      doc
        .save()
        .then((newDoc) => {
          res.json({
            resetTok: newDoc.resetPassTok,
            validTill: newDoc.resetPassExp,
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(401).json({
            message: "Internal Database Error",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        message: "Internal Database Error",
      });
    });
};

exports.validate = async (req, res, next) => {
  const { resetTok } = req.params;
  User.find({ resetPassTok: resetTok })
    .then(async (doc) => {
      if (doc.length > 0) {
        console.log(doc[0].resetPassExp > Date.now());
        if (doc[0].resetPassExp > Date.now()) {
          return res.json({
            message: "Reset Pass Token Expired! Please Try Again!",
          });
        } else {
          doc = doc[0];
          const { newPass } = req.body;
          try {
            const hash = await bcrypt.hash(newPass, CONSTANTS.SALTS || 10);
            doc.password = hash;
            doc.resetPassUsed = true;
            doc
              .save()
              .then((newDoc) => {
                const { username } = newDoc;

                res.json({
                  message: `Password Changed For ${username}`,
                });
              })
              .catch((_) => {});
          } catch (err) {
            res.status(400).json({
              message: "Internal Server Error!",
            });
          }
        }
      } else {
        res.status(400).json({
          message: "Bad Request",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({
        message: "No Such User Exist!",
      });
    });
};
