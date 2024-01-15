import express from "express";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

//getting the path name of static files to host from backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

// express server handle req, res
const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// creating a socket server, by wrapping it by socketio
// we must add cors option in socket server
const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
});

// listens for socket connection, send the recived data back to client
// every client connected to this server will have a unique socket id
io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // listening for "message" event that will be from forntend
  socket.on("message", (data) => {
    console.log(data);
    //creating a socket io even that will be listen by frontend
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);

    // this event will be listen by all client, but not here,
    // socket.io make sure not get in loop of emit and listen
  });
});
