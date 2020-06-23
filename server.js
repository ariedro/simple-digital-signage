const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "frontend")));

io.on("connection", (socket) => {
  socket.on("clientUpdate", (newStatus) => {
    console.log(`[${new Date().toISOString()}] Updated status to ${JSON.stringify(newStatus)}`);
    socket.broadcast.emit("broadcastUpdate", newStatus);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
