import React from 'react';

import { Box, Stack } from '@mui/material';
import { Typography } from '@mui/material';

const messageStyle = {
  // whitespace: 'normal',
  bgcolor: 'primary.main',
  color: 'white',
  borderRadius: 3,
  py: '6px',
  px: 2,
  mt: 0.5,
  mb: 2
}

const ChatBody = ({ messages, lastMessageRef }) => {
  return (
    <Stack direction='column'>
      {messages.map((message) =>
        message.name === sessionStorage.getItem('username') ? (
          <Stack alignSelf='flex-end'>
            <Box alignSelf='flex-end' pr={1}>You</Box>
            <Box sx={messageStyle}>
              <Typography
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white'
                }}
              >{message.text}</Typography>
            </Box>
          </Stack>
        ) : (
          <Stack alignSelf='flex-start'>
            <Box alignSelf='flex-start' pl={1}>{message.name}</Box>
            <Box
              sx={{
                // whitespace: 'normal',
                alignSelf: 'flex-start',
                border: 1,
                borderColor: 'lightgray',
                borderRadius: 3,
                py: '6px',
                px: 2,
                mt: 0.5,
                mb: 2
              }}
            >
              <Typography>{message.text}</Typography>
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