import React, { useEffect } from 'react';

import { Box, Stack } from '@mui/material';

const ChatBody = ({ messages, typingStatus, setTypingStatus, lastMessageRef }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTypingStatus('');
    }, 5000);
    return () => clearTimeout(timeout);
  }, [typingStatus, setTypingStatus]);

  return (
    <Stack direction='column'>
      {messages.map((message) =>
        message.name === sessionStorage.getItem('username') ? (
          <Stack alignSelf='flex-end'>
            <Box alignSelf='flex-end' pr={1}>You</Box>
            <Box
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 10,
                py: '6px',
                px: 2,
                mt: 0.5,
                mb: 2
              }}
            >
              {message.text}
            </Box>
          </Stack>
        ) : (
          <Stack alignSelf='flex-start'>
            <Box alignSelf='flex-start' pl={1}>{message.name}</Box>
            <Box
              sx={{
                alignSelf: 'flex-start',
                border: 1,
                borderColor: 'lightgray',
                borderRadius: 10,
                py: '6px',
                px: 2,
                mt: 0.5,
                mb: 2
              }}
            >
              {message.text}
            </Box>
          </Stack>
        )
      )}

      <div className="message__status">
        <p>{typingStatus}</p>
      </div>

      <div ref={lastMessageRef} />
    </Stack>
  );
};

export default ChatBody;