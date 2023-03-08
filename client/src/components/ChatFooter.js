import React, { useState } from 'react';

import { Box, Grid } from '@mui/material';
import { Toolbar } from '@mui/material';
import { AppBar } from '@mui/material';
import { InputBase } from '@mui/material';
import { IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const ChatFooter = ({ socket, messages, setMessages, typingStatus }) => {
  const [message, setMessage] = useState('');

  // Send typing status to other users.
  const handleTyping = (e) => {
    // Send message when user presses Enter key.
    if (e.key === 'Enter') {
      handleSendMessage(e);
    } else {
      socket.emit('typing', `${sessionStorage.getItem('username')} is typing`)
    }
  };

  // Send message to other users.
  const handleSendMessage = (e) => {
    // Don't send when text field is empty.
    if (message !== '') {
      e.preventDefault();
      // Immediately remove typing status.
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
    <AppBar
      sx={{
        position: 'fixed',
        top: 'auto',
        bottom: 0,
        left: 240,
        pr: 50,
        pb: 1,
      }}
      style={{ background: 'white', boxShadow: 'none' }}
    >
      <Box sx={{ color: 'slategray', fontStyle: 'italic', pl: 5 }}>
        {typingStatus}
      </Box>
      <Toolbar>
        <Grid container sx={{ border: 1, justifyContent: 'space-between' }}>
          <Grid item xs={11}>
            {/* Text field for entering messages. */}
            <InputBase
              variant='standard'
              fullWidth
              type='text'
              placeholder='Enter message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleTyping}
              sx={{
                border: 1,
                borderColor: 'lightgray',
                borderRadius: 10,
                pt: '5px',
                pb: '3px',
                px: 3,
                mr: 3,
              }}
            />
          </Grid>
          <Grid item xs={1}>
            {/* Send message button. Can also send with Enter key. */}
            <IconButton
              onClick={handleSendMessage}
              sx={{
                borderRadius: 10,
                width: 40,
                mt: 0.1,
                ml: 2,
                color: 'white',
                backgroundColor: 'primary.main'
              }}
            >
              <ArrowUpwardIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default ChatFooter;