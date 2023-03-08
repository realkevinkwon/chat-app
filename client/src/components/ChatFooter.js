import React, { useState } from 'react';

import { Box } from '@mui/material';
import { InputBase } from '@mui/material';
import { IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const ChatFooter = ({ socket, messages, setMessages, setTypingStatus }) => {
  const [message, setMessage] = useState('');

  const handleTyping = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(e);
    } else {
      socket.emit('typing', `${sessionStorage.getItem('username')} is typing`)
    }
  };

  const handleSendMessage = (e) => {
    if (message !== '') {
      e.preventDefault();
      socket.emit('typing', '');
      const data = {
        text: message,
        name: sessionStorage.getItem('username'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      }
      setMessages([...messages, data]);
      if (message.trim() && sessionStorage.getItem('username')) {
        socket.emit('message', data);
      }
      setMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <InputBase
        variant='standard'
        sx={{
          flexGrow: 1,
          borderRadius: 10,
          boxShadow: 3,
          pt: '8px',
          pb: '5px',
          px: 3,
          mr: 3
        }}
        type='text'
        placeholder='Enter message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleTyping}
      />
      <IconButton
        sx={{
          borderRadius: 10,
          width: 48,
          boxShadow: 3,
          color: 'white',
          backgroundColor: 'primary.main'
        }}
        onClick={handleSendMessage}
      >
        <ArrowUpwardIcon />
      </IconButton>
    </Box>
  );
};

export default ChatFooter;