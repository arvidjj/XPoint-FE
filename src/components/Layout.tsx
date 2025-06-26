import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Button,
  CssBaseline, 
  Divider, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  CalendarMonth as CalendarIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
  Home as HomeIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  EventAvailable,
  HomeRepairService
} from '@mui/icons-material';
import { useAuth } from '../features/auth/context/AuthContext';
import { AdminOnly } from './ProtectedComponent';

const drawerWidth = 240;  

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'XPoint';
    if (path.startsWith('/appointments')) return 'Appointments';
    if (path.startsWith('/login')) return 'Login';
    if (path.startsWith('/register')) return 'Register';
    return '';
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Appointments', icon: <CalendarIcon />, path: '/appointments' },
    { text: 'Servicios', icon: <HomeRepairService />, path: '/servicios' },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
        <Typography variant="h6" noWrap component="div">
          XPoint Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='absolute'
        sx={{
          width: { sm: user?.role === 'admin' ? `calc(100% - ${drawerWidth}px)` : '100%' },
          ml: { sm: user?.role === 'admin' ? `${drawerWidth}px` : 0 },
        }}
      >
        <Toolbar>
          {user?.role === 'admin' && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <IconButton
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>

          {user?.role === 'user' && (
            <Button 
              color="inherit" 
              startIcon={<LoginIcon />}
              onClick={() => navigate('/booking')}
              sx={{ mr: 1 }}
            >
              Booking
            </Button>
          )}

          <Button 
            color="inherit" 
            startIcon={<EventAvailable />}
            onClick={() => navigate('/mis-reservas')}
            sx={{ mr: 1 }}
            >
              Mis reservas
            </Button>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {/*getPageTitle()*/}
            XPoint
          </Typography>

          {user ? (
            <div>
              <Tooltip title="Account settings">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button 
                color="inherit" 
                startIcon={<LoginIcon />}
                onClick={() => navigate('/login')}
                sx={{ mr: 1 }}
              >
                Iniciar Sesión
              </Button>
              <Button 
                variant="outlined" 
                color="inherit"
                startIcon={<PersonAddIcon />}
                onClick={() => navigate('/register')}
              >
                Registrarse
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {user?.role === 'admin' && (
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: user?.role === 'admin' ? `calc(100% - ${drawerWidth}px)` : '100%' },
          ml: { sm: user?.role === 'admin' ? 0 : 'auto' },
          mt: 8, // Offset for the AppBar
        }}
      >
        {children}
      </Box>
    </Box>
  );
}