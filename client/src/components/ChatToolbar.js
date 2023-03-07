import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Button } from '@mui/material';
import { AppBar } from '@mui/material';
import { Box } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

const ChatToolbar = () => {
  const navigate = useNavigate();

  const handleLeave = () => {
    sessionStorage.removeItem('username');
    navigate('/');
    window.location.reload();
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        color: 'primary.main',
        bgcolor: 'white',
        borderBottom: 1,
        borderColor: 'lightgray',
        boxShadow: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Typography variant='h6' noWrap component='div'>
            kevin's chat app
          </Typography>
        </Box>
        <Box>
          <Button
            variant='outlined'
            endIcon={<ManageAccountsIcon />}
            sx={{ mx: 3 }}
          >
            {sessionStorage.getItem('username')}
          </Button>
          <Button
            variant='outlined'
            endIcon={<LogoutIcon />}
            onClick={handleLeave}
          >
            SIGN OUT
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ChatToolbar;