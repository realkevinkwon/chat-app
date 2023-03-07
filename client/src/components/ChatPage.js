import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatList from './ChatList';

import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const [users, setUsers] = useState([]);
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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            COOL KIDS CHAT
          </Typography>
        </Toolbar>
      </AppBar>

      <ChatList socket={socket} />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div className='chat'>
          <div className='chat__main'>
            <ChatBody
              messages={messages}
              typingStatus={typingStatus}
              setTypingStatus={setTypingStatus}
              lastMessageRef={lastMessageRef}
            />
            <ChatFooter
              socket={socket}
              messages={messages}
              setMessages={setMessages}
              setTypingStatus={setTypingStatus}
            />
          </div>
          <ChatBar
            users={users}
          />
        </div>
      </Box>
    </Box>
  );
};

export default ChatPage;