// Load modules
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Initialize Express app, HTTP server, and socket.io
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

const PORT = 8080;

// Enable Cross-Origin Resource Sharing
app.use(cors());

/* [ 
  { username: 'name', socketID: 'id' },
  ...
] */
let users = [];

/* chats = [
  { 
    name: 'chat_name',
    id: 'id',
    owner: 'name',
    users: [
      { username: 'name', socketID: 'id' },
      ...
    ]
  },
  ...
] */
// let chats = [];

// Run upon new connection.
io.on('connection', (socket) => {
  console.log(`${socket.id } user connected`);

  // New user joins.
  socket.on('newUser', (user) => {
    users.push(user);
    console.log(users);
    io.emit('newUserResponse', users);
  });

  // // Chat is created.
  // socket.on('createChat', (chat) => {
  //   console.log(`${chat.name} has been created by ${chat.owner}`);
  //   chats.push(chat);
  //   console.log(chats);
  //   socket.broadcast.emit('createChatResponse', chats);
  // });

  // // Chat is deleted.
  // socket.on('deleteChat', (chat) => {
  //   console.log(`${chat.name} has been deleted`)
  //   chats = chats.filter((item) => item.id !== chat.id);
  //   console.log(chats);
  //   socket.broadcast.emit('deleteChatResponse', chats);
  // });

  // // User joins a chat.
  // socket.on('joinChat', (user, chat) => {

  // });

  // // User leaves a chat.
  // socket.on('leaveChat', (user, chat) => {

  // });

  // User begins typing.
  socket.on('typing', (status) => {
    socket.broadcast.emit('typingResponse', status);
  });

  // User sends message.
  // Broadcast received messages to all clients except sender.
  socket.on('message', (message) => {
    socket.broadcast.emit('messageResponse', message);
  });

  // User disconnects.
  socket.on('disconnect', () => {
    console.log('a user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);
    console.log(users);
    io.emit('newUserResponse', users);
    socket.disconnect();
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});