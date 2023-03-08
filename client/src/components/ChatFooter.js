import React, { useState } from 'react';

import { Box, Grid } from '@mui/material';
import { Toolbar } from '@mui/material';
import { AppBar } from '@mui/material';
import { InputBase } from '@mui/material';
import { IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const ChatFooter = ({ socket, messages, setMessages, typingStatus }) => {
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
    <AppBar
      sx={{
        position: 'fixed',
        top: 'auto',
        bottom: 0,
        left: 240,
        pr: 50,
        pb: 1
      }}
      style={{
        background: 'white',
        boxShadow: 'none'
      }}
    >
      <Box
        sx={{
          color: 'slategray',
          fontStyle: 'italic',
          pl: 5
        }}
      >
        {typingStatus}
      </Box>
      <Toolbar>
        <Grid
          container
          sx={{
            border: 1,
            justifyContent: 'space-between'
          }}
        >
          <Grid item xs={11}>
            <InputBase
              variant='standard'
              fullWidth
              sx={{
                border: 1,
                borderColor: 'lightgray',
                borderRadius: 10,
                // left: 240,
                pt: '8px',
                // pb: '5px',
                px: 3,
                mr: 3,
              }}
              type='text'
              placeholder='Enter message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleTyping}
            />
          </Grid>
          <Grid item>
            <IconButton
              sx={{
                borderRadius: 10,
                width: 40,
                mt: 0.4,
                // right: 160,
                color: 'white',
                backgroundColor: 'primary.main'
              }}
              onClick={handleSendMessage}
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