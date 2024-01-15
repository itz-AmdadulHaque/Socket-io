const ws = require("ws");
const server = new ws.Server({ port: "3000" });

// listener
// when anything comes form the frontend it will send it back
server.on("connection", (socket) => {
  socket.on("message", (message) => {
    const b = Buffer.from(message);
    console.log(b.toString());
    socket.send(`${message}`);
  });
});

/*
we recive and send message as string, but when console log it 
shows in buffer fromat. it accually a string but the console 
output is like buffer.
Node.js's console often applies a default formatting to objects
and strings, which can make them appear buffer-like, 
especially when dealing with character data.
*/
