const { CONSTANTS } = require("../config");
const axios = require("axios");
const api = CONSTANTS.JIKANANIME;
const BOTS = {
  anime: (name, res) => {
    axios
      .get(CONSTANTS.JIKANANIME + name)
      .then((response) => {
        res.json({
          data: response.data.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  cosplay: (name, res) => {
    axios
      .get(CONSTANTS.COSPLAYAPI + "cosplay " + name)
      .then((response) => {
        res.json({
          data: response.data.results,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          _message: "Internal Bot Error!",
        });
      });
  },
};
exports.postBot = (req, res, next) => {
  const { name } = req.body;
  const botname = req.params.name;
  const bot = BOTS[botname];
  console.log(`[BOTS] |${botname}| is used by ${req.userID}`.gray.underline);
  bot(name, res);
};
