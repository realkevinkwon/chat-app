import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Button } from '@mui/material';
import { AppBar } from '@mui/material';
import { Box } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

const buttonRadius = 3;
const buttonColor = 'lightgray';

const ChatToolbar = () => {
  const navigate = useNavigate();

  // Remove user and redirect to home page.
  const handleLeave = () => {
    sessionStorage.removeItem('username');
    navigate('/');
    window.location.reload();
  };

  return (
    // Display title, user, and sign out button.
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
          <Typography variant='h6' noWrap component='div' fontWeight='300'>
            kevin's chat app
          </Typography>
        </Box>
        <Box>
          {/* User button (note: does not do anything yet) */}
          <Button
            variant='outlined'
            endIcon={<ManageAccountsIcon />}
            sx={{
              mx: 3,
              borderColor: buttonColor,
              borderRadius: buttonRadius
            }}
          >
            {sessionStorage.getItem('username')}
          </Button>
          {/* Log out button. */}
          <Button
            variant='outlined'
            endIcon={<LogoutIcon />}
            onClick={handleLeave}
            sx={{
              borderColor: buttonColor,
              borderRadius: buttonRadius
            }}
          >
            SIGN OUT
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ChatToolbar;