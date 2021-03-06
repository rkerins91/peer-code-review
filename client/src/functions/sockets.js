import io from "socket.io-client";

class SocketManager {
  constructor() {
    this.socket = io("localhost:3001"); //in production do not specify port
    this.subscribers = [];
  }

  login(userId) {
    this.socket.emit("login", userId);
  }

  subscribe(component, fn) {
    this.subscribers.push({ name: component, function: fn });
  }

  unsubscribe(component) {
    const findSubscriber = () => {
      this.subscribers.forEach((subscriber, index) => {
        if (subscriber.name === component) {
          return index;
        }
      });
    };
    this.subscribers.splice(findSubscriber(), 1);
  }

  initializeEvents() {
    this.socket.on("notification", data => {
      console.log("notification received");
      this.subscribers.forEach(subscriber => {
        try {
          subscriber.function(data);
        } catch (err) {
          console.log(err);
        }
      });
    });
  }
}

const socket = new SocketManager();
socket.initializeEvents();

export default socket;
