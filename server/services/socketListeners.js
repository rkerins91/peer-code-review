const io = require("socket.io")();

module.exports = {
  eventConfig: socket => {
    console.log("Client connected via sockets");
    socket.emit("notification", "you are connected");

    // Subscribe this socket connection to a room keyed by their userId
    socket.on("login", userId => {
      socket.join(userId, () =>
        socket.emit("join-message", "joined room " + userId)
      );
    });

    const broadcast = () => {
      console.log("test test");
    };
  }
};
