// Load modules.
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Initialize Express app, HTTP server, and socket.io.
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

// Set port for listening for incoming connections.
const PORT = 8080;

// Enable Cross-Origin Resource Sharing.
app.use(cors());

// Maintain list of users, chats, and messages.
let users = [];
let chats = [];
let messages = [];

/* 
  Run upon new connection (i.e., when a new user connects).

  socket.on(...);
    - Listen for incoming messages.
  io.emit(...);
    - Send message to all clients.
  socket.broadcast.emit(...);
    - Send message to all clients except sender.
*/
io.on('connection', (socket) => {
  console.log(`user connected (socketID: ${socket.id})`);

  // New user joins.
  socket.on('newUser', (user) => {
    users.push(user);
    io.emit('newUserResponse', users, chats, messages);
  });

  // User creates a new chat.
  socket.on('createChat', (chat) => {
    chats.push(chat);
    socket.broadcast.emit('createChatResponse', chats);
  });

  // User begins typing.
  socket.on('typing', (status) => {
    socket.broadcast.emit('typingResponse', status);
  });

  // User sends a message.
  socket.on('message', (message) => {
    messages.push(message);
    socket.broadcast.emit('messageResponse', message);
  });

  // User disconnects.
  socket.on('disconnect', () => {
    console.log(`user disconnected (socketID: ${socket.id})`);
    // Remove disconnecting user from users list.
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit('newUserResponse', users, chats, messages);
    socket.disconnect();
  });
});

// Listen for incoming connections.
httpServer.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});