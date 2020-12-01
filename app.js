//* Import Statements *//
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const api = require("./routes/api.routes");
const { CONSTANTS } = require("./config");
const colors = require("colors");
const io = require("socket.io");
const sock = require("./controllers/Socket");

//* App Configs *//
app.use(express.json());
app.use(cors());
app.use(api);

//* Sockets *//

//* Port Configs And Database Stuffs *//
let port = CONSTANTS.PORT;
mongoose
  .connect(CONSTANTS.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`[DATABASE] Connected`.yellow.bold);
    const server = app.listen(port, () => {
      console.log(`[SERVER] Up And Runnin' On ${port}`.blue.underline);
    });
    const ioObj = io(server);
    let sockets = [];
    ioObj.on("connect", (socket) => {
      console.log(socket.id);
      sockets.push(socket);
      sock(socket, ioObj);
    });
  })
  .catch((err) => {
    console.error(err);
  });
