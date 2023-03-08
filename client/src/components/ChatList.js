import React from 'react';

import { Box } from '@mui/material';
import { Drawer } from '@mui/material';
import { Toolbar } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const chatListWidth = 240;

const ChatList = ({ chats, handleOpenCreateChat }) => {
  return (
    // Permanent Drawer with list of existing chats and 'Create chat' button.
    <Drawer
      variant="permanent"
      sx={{
        width: chatListWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: chatListWidth,
          boxSizing: 'border-box'
        }
      }}
    >
      {/* Prevent overlap with AppBar. */}
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {/* Chats. */}
          {chats.map((chat) => (
            <ListItem key={chat.id} disablePadding>
              <ListItemButton>
                <ListItemIcon><ChatIcon /></ListItemIcon>
                <ListItemText primary={chat.name} />
              </ListItemButton>
            </ListItem>
          ))}
          {/* 'Create chat' button. */}
          <ListItem key='createChat' disablePadding>
            <ListItemButton onClick={handleOpenCreateChat}>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary='Create chat' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default ChatList;