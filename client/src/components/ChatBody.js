import React from 'react';

import { Box, Stack } from '@mui/material';
import { Typography } from '@mui/material';

const messageStyle = {
  display: 'flex',
  wordBreak: 'break-word',
  borderRadius: 3,
  py: '6px',
  px: 2,
  mt: 0.5,
  mb: 2
}

const ChatBody = ({ messages, lastMessageRef }) => {
  return (
    <Stack
      direction='column'
      width='100%'
    >
      {messages.map((message) =>
        message.name === sessionStorage.getItem('username') ? (
          <Stack alignSelf='flex-end'>
            <Box alignSelf='flex-end' pr={1}>You</Box>
            <Box
              sx={messageStyle}
              bgcolor='primary.main'
              color='white'
            >
              <Typography>
                {message.text}
              </Typography>
            </Box>
          </Stack>
        ) : (
          <Stack alignSelf='flex-start'>
            <Box alignSelf='flex-start' pl={1}>{message.name}</Box>
            <Box
              sx={messageStyle}
              bgcolor='white'
              color='black'
              border={1}
              borderColor='lightgray'
            >
              <Typography>{message.text}</Typography>
            </Box>
          </Stack>
        )
      )}
      <div ref={lastMessageRef} />
    </Stack>
  );
};

export default ChatBody;