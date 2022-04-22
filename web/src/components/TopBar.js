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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

import { Link } from 'react-router-dom';

import sativa_logo from '../resources/sativa_logo.jpeg';


const settings = ['Profile', 'Account', 'Logout'];

const TopBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#264118',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="absolute">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar src={sativa_logo} sx={{ mr: 2 }} />

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to="/SignIn" style={{ textDecoration: 'none' }}>
                <Button onClick={(handleCloseNavMenu)}
                        sx={{ my: 2, color: 'white', display: 'block',
                        '&:hover': { color: 'black', background: 'white'} }}>
                  Sign In
                </Button>
              </Link>
              <Link to="/SignUp" style={{ textDecoration: 'none' }}>
                <Button onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block',
                        '&:hover': { color: 'black', background: 'white'} }}>
                  Register
                </Button>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Link to="/Orders" style={{ textDecoration: 'none' }}>
                <Button onClick={(handleCloseNavMenu)}
                        sx={{ my: 2, color: 'white', display: 'block',
                        '&:hover': { color: 'black', background: 'white'} }}>
                  Orders
                </Button>
              </Link>
              <Link to="/Payments" style={{ textDecoration: 'none' }}>
                <Button onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block',
                        '&:hover': { color: 'black', background: 'white'} }}>
                  Payments
                </Button>
              </Link>
              <Link to="/Products" style={{ textDecoration: 'none' }}>
                <Button onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block',
                        '&:hover': { color: 'black', background: 'white'} }}>
                  Products
                </Button>
              </Link>
              <Link to="/Customers" style={{ textDecoration: 'none' }}>
                <Button onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block',
                        '&:hover': { color: 'black', background: 'white'} }}>
                    Customers
                </Button>
              </Link>    
            </Box>

            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: 'white' }}>
                    <PersonIcon color="primary"/>
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu} sx={{
                    '&:hover': { color: 'white', background: '#264118'}
                  }}>
                    <Typography textAlign="center" >{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default TopBar;