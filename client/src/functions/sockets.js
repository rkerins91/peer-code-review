import io from "socket.io-client";

let socket = io("localhost:3001");

socket.on("notification", data => console.log(data));

socket.on("join-message", msg => console.log(msg));

export default socket;
