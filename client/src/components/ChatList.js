import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import { Drawer } from '@mui/material';
import { Toolbar } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const drawerWidth = 240;

const ChatList = ({ socket }) => {
  const [chats, setChats] = useState([]);

  // useEffect(() => {
  //   socket.on('createChatResponse', (new_chats) => setChats(new_chats));
  // }, [socket, chats]);

  const handleCreateChat = (e) => {
    e.preventDefault();

    // // Create new chat.
    // const chat = {
    //   name: 'chat_name',
    //   id: `${Math.random()}`,
    //   owner: sessionStorage.getItem('username'),
    //   users: []
    // }
    // // Add new chat to this session.
    // setChats([chat, ...chats]);
    // socket.emit('createChat', chat);
  };

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
          {chats.map((chat, index) => (
            <ListItem key={chat} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary={chat} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem key='newChat' disablePadding>
            <ListItemButton onClick={handleCreateChat}>
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