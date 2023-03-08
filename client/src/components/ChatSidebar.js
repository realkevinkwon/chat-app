import React from 'react';

import { Box } from '@mui/material';
import { Drawer } from '@mui/material';
import { Toolbar } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const sidebarWidth = 160;

const ChatSidebar = ({ socket, users }) => {
  return (
    // Permanent Drawer with list of active users minus the current user.
    <Drawer
      variant="permanent"
      anchor='right'
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: sidebarWidth,
          boxSizing: 'border-box'
        }
      }}
    >
      {/* Prevent AppBar from overlapping with Drawer. */}
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {/* Filter current user. */}
          {users.filter(({ username, socketID }) =>
            socketID !== socket.id).map(({ username, socketID }) => (
              <ListItem key={socketID} disablePadding>
                <ListItemButton>
                  <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                  <ListItemText primary={username} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Drawer>
  );
};

export default ChatSidebar;