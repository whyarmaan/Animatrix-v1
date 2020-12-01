const Chatroom = require("../models/Chatroom");
let active = {};
module.exports = (socket, io) => {
  socket.on("message", (info) => {
    // A Message Object Should Have (user: mongoose.Types.ObjectId, message: String);
    console.log(info);
    const { user, message, room } = info;
    Chatroom.findById(room._id, (err, doc) => {
      if (err) {
        console.error(err);
        socket.send("err", "Internal Server Error");
      } else {
        doc.messages.push({
          user,
          message,
        });
        doc
          .save()
          .then((doc) => {
            console.log(`[Socket] [Database] Message Saved`.green.underline);
          })
          .catch((err) => {
            console.log(err);
            socket.send("error", "Internal Server Error");
          });
      }
    });
    console.log(active[socket.id]);
    io.to(active[socket.id].room._id).emit("new-message", { user, message });
  });
  socket.on("joined", (room) => {
    console.log(room);
    socket.join(room.room._id);
    io.to(room.room._id).emit("conn", "A New Connection Hopped In");
    active[socket.id] = {
      room: room.room,
      username: room.username,
    };
  });
};
