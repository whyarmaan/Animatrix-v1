require("dotenv").config();
exports.CONSTANTS = {
  MONGOURI: process.env.MONGOURI,
  PORT: 8000,
  JWTSTRING: process.env.JWTSTRING,
  SALTS: parseInt(process.env.SALTS),
  JIKANANIME: process.env.JIKANANIME,
  COSPLAYAPI: process.env.COSPLAYAPI,
};
