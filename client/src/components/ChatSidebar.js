import React from 'react';

import { Box } from '@mui/material';
import { Drawer } from '@mui/material';
import { Toolbar } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 160;

const ChatSidebar = ({ socket, users }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
      anchor='right'
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {users.filter(({ username, socketID }) => 
            socketID !== socket.id).map(({ username, socketID }) => (
              <ListItem key={socketID} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={username} />
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default ChatSidebar;