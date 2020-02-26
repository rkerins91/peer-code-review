const io = require("socket.io")();

module.exports = {
  eventConfig: socket => {
    console.log("Client connected via sockets");
  },

  broadcast: (roomName, eventName, data) => {}
};
