const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const cors = require('cors');
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

const PORT = 8080;

app.use(cors());

let users = [];

// Run upon new connection.
io.on('connection', (socket) => {
  console.log(`${socket.id } user connected`);

  socket.on('newUser', (data) => {
    users.push(data);
    console.log(users);
    io.emit('newUserResponse', users);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typingResponse', data);
  });

  // Broadcast received messages to all clients except sender.
  socket.on('message', (data) => {
    socket.broadcast.emit('messageResponse', data);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit('newUserResponse', users);
    socket.disconnect();
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});