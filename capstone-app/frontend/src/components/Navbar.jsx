import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Groups2Icon from '@mui/icons-material/Groups2';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { useState } from 'react';

const pages = [
        {link: '/home', label: 'Home'}, 
        {link: '/exercises', label: 'Exercises'},
        {link: '/users', label: 'Users'},
        {link: '/adminexercise', label: 'Admin Exercise'},
        {link: '/assignexercise', label: 'Assign Exercise'},
        {link: '/uae', label: 'Users Exercise'},
        
    ];

    const pageStudent = [
      {link: '/home', label: 'Home'}, 
      {link: '/exercises', label: 'Exercises'},
      {link: '/video', label: 'Video'} 
  ];
    const settings = [{link: '/account', label: 'Account'}, {link: '/', label: 'Sign Out', onClick: () => {handleUpdateUser({})}}];

// see https://mui.com/material-ui/react-app-bar/
function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {currentUser, handleUpdateUser} = useUserContext();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

   if (!currentUser) {
    return null;
  }

  return (
    <AppBar 
    position="sticky"
    sx={{
      mr: 2,
      display: {  md: 'flex' },
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'white',
      backgroundColor: 'brown',
      borderRadius: 3,
    }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* desktop menu logo and icon */}
          <Groups2Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           Coach-Space
          </Typography>

          {/* mobile menu items in a flexbox */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
              <MenuIcon />
            </IconButton>            
            <Menu id="menu-appbar" anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
             

              {currentUser.role != 'student' ? (
                pages.map((page) => (
                <MenuItem key={page.link} component={NavLink} to={page.link}>{page.label}</MenuItem>
              ))
              ): (
                pageStudent.map((page) => (
                  <MenuItem key={page.link} component={NavLink} to={page.link}>{page.label}</MenuItem>
                ))
              )
            
            }
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Coach-Space
          </Typography>

          {/* desktop menu items are here, grouped into a flex box */}
          <Box sx={{flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            

          {currentUser.role != 'student' ? (
                pages.map((page) => (
                <MenuItem key={page.link} component={NavLink} to={page.link}>{page.label}</MenuItem>
              ))
              ): (
                pageStudent.map((page) => (
                  <MenuItem key={page.link} component={NavLink} to={page.link}>{page.label}</MenuItem>
                ))
              )
            
            }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src= "https://robohash.org/${name}?size=50x50&set=3"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ 
                mt: '45px',
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem 
                key={setting.link} 
                    component={NavLink} 
                    to={setting.link}
                    onClick={setting.onClick}
                    >
                        {setting.label}
                    
                </MenuItem>
                
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
