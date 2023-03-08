import React, { useEffect, useState, useRef } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatToolbar from './ChatToolbar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatList from './ChatList';

import { Box, Stack } from '@mui/material';
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

  useEffect(() => {
    socket.on('newUserResponse', (new_users) => setUsers(new_users));
  }, [socket, users]);

  useEffect(() => {
    socket.on('messageResponse', (message) => setMessages([...messages, message]));
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', (status) => setTypingStatus(status));
  }, [socket]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTypingStatus('');
    }, 5000);
    return () => clearTimeout(timeout);
  }, [typingStatus, setTypingStatus]);

  const handleOpenCreateChat = () => {
    setChatName('');
    setOpen(true);
  };

  const handleCreateChat = () => {
    if (chatName !== '') {
      setOpen(false);
      const chat = {
        name: chatName,
        id: `${Math.random()}`,
        owner: sessionStorage.getItem('username'),
        users: []
      }
      setChats([chat, ...chats]);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ChatToolbar />
      <ChatList
        socket={socket}
        chats={chats}
        handleOpenCreateChat={handleOpenCreateChat}
      />
      <Box component='main' sx={{ flexGrow: 1, p: 3, mb: 8 }}>
        <Toolbar />
        <Stack direction='column' justifyContent='space-between'>
          <ChatBody
            messages={messages}
            lastMessageRef={lastMessageRef}
          />
        </Stack>
      </Box>
      <ChatFooter
        socket={socket}
        messages={messages}
        setMessages={setMessages}
        typingStatus={typingStatus}
      />
      <ChatSidebar
        socket={socket}
        users={users}
      />
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
          <DialogActions>
            <Button
              sx={{ right: '25%' }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={{ left: '5%' }}
              onClick={handleCreateChat}
            >
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ChatPage;