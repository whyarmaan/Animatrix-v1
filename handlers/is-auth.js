const jwt = require("jsonwebtoken");
const { CONSTANTS } = require("../config");

module.exports = async (req, res, next) => {
  if (
    req.query.hasOwnProperty("accessToken") &&
    req.query.hasOwnProperty("refreshToken")
  ) {
    const { accessToken, refreshToken } = req.query;
    jwt.verify(refreshToken, CONSTANTS.JWTSTRING, (err, result) => {
      if (err) {
        console.error(err);
        res.status(401).json({
          message: "Unauthorized!",
        });
      } else {
        if (result) {
          req.userID = result.id;
          next();
        } else {
          jwt.verify(accessToken, CONSTANTS.JWTSTRING, (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                _message: "Unauthorized",
              });
            } else {
              if (result) {
                req.userID = result.id;
                return next();
              } else {
                return res.status(401).json({
                  message: "Unauthorized",
                });
              }
            }
          });
        }
      }
    });
  }
};
