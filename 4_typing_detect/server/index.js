import express from 'express'
import { Server } from "socket.io"
import path from 'path'
import { fileURLToPath } from 'url'

//static file path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500

const app = express()

//serve static file
app.use(express.static(path.join(__dirname, "public")))

//express server
const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

// wrapping express server by socketio
const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

// socket.io listening for connection with frontend
io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    // Upon connection - only to user 
    socket.emit('message', "Welcome to Chat App!")

    // Upon connection - to all others 
    socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}} connected`)

    // Listening for a message event 
    socket.on('message', data => {
        console.log(data)
        //to all user connected, (from different tab or browser)
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })

    // When user disconnects - to all others 
    socket.on('disconnect', () => {
        socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}} disconnected`)
    })

    // Listen for activity (typing)
    socket.on('activity', (name) => {
        socket.broadcast.emit('activity', name)
    })
})