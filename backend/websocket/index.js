const { WebSocketServer } = require('ws');
const http = require('http');

const express = require("express");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");

// Spinning the http server and the WebSocket server.
// const wss = new WebSocketServer({port: 8080});

app.use(cors());

const server = http.createServer(app);

var count = 0;

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// wss.on('connection', function(connection) {
//     count++
//     wss.emit('broadcast', count +' people online!')
//     console.log(count)

//     connection.on('close' ,function(data) {
//         count--
//         wss.emit('broadcast', count +' people online!')
//         console.log(count + ' Close')
//     })
//   });

io.on('connection', (socket) => {
    count++
    io.sockets.emit('broadcast', count)
    console.log(count)

    socket.on('connected', () => {
        io.sockets.emit('broadcast', count)
    })

    socket.on('disconnect', () => {
        count--
        io.sockets.emit('broadcast', count)
        console.log(count + ' Close')
    })
});


server.listen(8888, () => {
    console.log("SERVER IS RUNNING");
});
