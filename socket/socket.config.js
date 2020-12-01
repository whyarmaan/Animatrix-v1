let sockets = [];
const ChatRoom = require("../models/Chatroom");
exports.getSockets = () => sockets;
exports.init = io => {
  io.on("connection", socket => {
    console.log(`[SOCKETS] A New Socket Connected: (${socket.id})`.gray.bold);
    sockets.push(socket);    
  });
};
exports.listen = () => {
  sockets.forEach(sock => {
    sock.on("room", room => {
      console.log(room);
    });
  });
};
