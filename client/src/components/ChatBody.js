import React from 'react';

import { Box, Stack } from '@mui/material';

const ChatBody = ({ messages, lastMessageRef }) => {
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
{/* 
      <Box anchor='flex-end'>
        {typingStatus}
      </Box> */}

      <div ref={lastMessageRef} />
    </Stack>
  );
};

export default ChatBody;