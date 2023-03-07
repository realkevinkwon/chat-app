import React from 'react';

import { Box } from '@mui/material';
import { Drawer } from '@mui/material';
import { Toolbar } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const drawerWidth = 240;

const ChatList = ({ chats, handleOpenCreateChat }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {chats.map((chat) => (
            <ListItem key={chat.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary={chat.name} />
              </ListItemButton>
            </ListItem>
          ))}
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