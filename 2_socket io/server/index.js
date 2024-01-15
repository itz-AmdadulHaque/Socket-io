import { createServer } from "http";
import { Server } from "socket.io";

// server is handling req, and res
const httpServer = createServer();

// creating a socket server
// we must add cors option in socket server
const io = new Server(httpServer, {
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

// server at port 3500
httpServer.listen(3500, () => console.log("listening on port 3500"));
