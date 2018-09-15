const express = require('express');
const socket = require('socket.io');

// create app
const app = express();

// static files
app.use(express.static('public'));

// server setup
const server = app.listen(3000, () => {
    console.log('server listening on port 3000');
});

// socket setup and pass server

const io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection');
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});
