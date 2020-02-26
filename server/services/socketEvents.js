const io = require("socket.io")();

module.exports = {
  eventConfig: socket => {
    console.log("Client connected via sockets");

    // Subscribe this socket connection to a room keyed by their userId
    socket.on("login", userId => {
      socket.join(userId);
    });
  },

  broadcast: (roomName, data) => {
    io.to(roomName).emit("notification", {
      _id: "notificationId",
      event: "new_assignment",
      origin: "system",
      read: false,
      createdAt: new Date(Date.now())
    });
  }
};
