import React, { useEffect, useState, useRef } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatToolbar from './ChatToolbar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatList from './ChatList';

import { Box } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { Toolbar } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';

const ChatPage = ({ socket }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatName, setChatName] = useState('');
  const lastMessageRef = useRef(null);

  // Set users, chats, and messages upon joining.
  useEffect(() => {
    socket.on('newUserResponse', (new_users, new_chats, new_messages) => {
      setUsers(new_users);
      setChats(new_chats);
      setMessages(new_messages);
    });
  }, [socket]);

  // Handle incoming messages.
  useEffect(() => {
    socket.on('messageResponse', (message) => setMessages([...messages, message]));
  }, [socket, messages]);

  // Automatically scroll chat view when new messages are added.
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Display typing status of other users.
  useEffect(() => {
    socket.on('typingResponse', (status) => setTypingStatus(status));
  }, [socket]);

  // Remove typing status 5 seconds after other user stops typing.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTypingStatus('');
    }, 5000);
    return () => clearTimeout(timeout);
  }, [typingStatus, setTypingStatus]);

  // Handle new chats created by other users.
  useEffect(() => {
    socket.on('createChatResponse', (new_chats) => setChats(new_chats));
  }, [socket]);

  // Open create chat dialog.
  const handleOpenCreateChat = () => {
    setChatName('');
    setOpen(true);
  };

  // Close create chat dialog.
  const handleClose = () => {
    setOpen(false);
  };

  // Create new chat when user presses 'Create' in the create chat dialog.
  const handleCreateChat = () => {
    if (chatName !== '') {
      setOpen(false);
      const chat = {
        name: chatName,
        id: `${socket.id}${Math.random()}`,
        owner: sessionStorage.getItem('username'),
        users: [],
        messages: []
      }
      setChats([chat, ...chats]);
      socket.emit('createChat', chat);
    }
  };

  return (
    <Box>
      <CssBaseline />
      <ChatToolbar />
      {/* List of chats. */}
      <ChatList
        chats={chats}
        handleOpenCreateChat={handleOpenCreateChat}
      />
      <Box
        position='absolute'
        left={240}
        right={160}
      >
        <Box sx={{ p: 3, mb: 8, }}>
          <Toolbar />
          {/* Body of chat (i.e., messages). */}
          <ChatBody
            messages={messages}
            lastMessageRef={lastMessageRef}
          />
        </Box>
        {/* Text input field and typing status. */}
        <ChatFooter
          socket={socket}
          messages={messages}
          setMessages={setMessages}
          typingStatus={typingStatus}
        />
      </Box>
      {/* List of active users. */}
      <ChatSidebar
        socket={socket}
        users={users}
      />
      {/* Dialog for creating chats. */}
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ px: 3 }}>
          <DialogTitle>Create a new chat</DialogTitle>
          <TextField
            autoFocus
            margin='normal'
            id='chat_name'
            label='Chat name'
            type='text'
            fullWidth
            variant='outlined'
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
          />
          {/*
            Cancel and create buttons for exiting dialog.
            User can also cancel by clicking outside dialog.
          */}
          <DialogActions>
            <Button sx={{ right: '25%' }} onClick={handleClose}>
              Cancel
            </Button>
            <Button sx={{ left: '5%' }} onClick={handleCreateChat}>
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ChatPage;