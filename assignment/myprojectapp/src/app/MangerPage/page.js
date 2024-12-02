'use client';

import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Image from 'next/image';
import Button from '@mui/material/Button';
import './styles.css';

const settings = ['Logout'];

export default function ManagerPage() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [weather, setWeatherData] = React.useState(null);
  const [cartItems, setCartItems] = React.useState([]);
  const [orders, setOrders] = React.useState([]);

  // Fetch weather data
  React.useEffect(() => {
    fetch('http://localhost:3000/api/getWeather')
      .then((res) => res.json())
      .then((data) => setWeatherData(data.temp))
      .catch((err) => console.error('Error fetching weather data:', err));
  }, []);

  // Fetch cart data
  React.useEffect(() => {
    fetch('http://localhost:3000/api/getCartItems')
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error('Error fetching cart items:', err));
  }, []);

  // Fetch orders data
  React.useEffect(() => {
    fetch('http://localhost:3000/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error('Error fetching orders:', err));
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    alert('Manager logged out');
    window.location.href = '/login'; // Redirect to the login page after logout
  };

  return (
    <Box className="page-container">
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Image src="/images/krispy_kreme_logo.gif" alt="Krispy Kreme Logo" width={100} height={100} />

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}>
            <Button color="inherit">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button color="inherit">
              <Link href="/shoppingcart">Shopping Cart</Link>
            </Button>
          </Box>

          <Typography variant="body1" sx={{ ml: 2 }}>
            Today's Temp: {weather !== null ? `${weather}°C` : 'Loading...'}
          </Typography>
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <Tooltip title="View Shopping Cart">
              <IconButton component={Link} href="/shoppingcart" color="inherit">
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Manager Avatar" src="/static/images/avatar/manager.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 4, p: 2, backgroundColor: '#ffe6f0', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#ff4081' }}>Manager Dashboard</Typography>
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>Orders:</Typography>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <Box
                key={index}
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '8px',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="body1">Order #{order._id}</Typography>
                <Typography variant="body2">Items: {order.items.map(item => `${item.name} ($${item.price})`).join(', ')}</Typography>
                <Typography variant="body2">Total: ${order.total.toFixed(2)}</Typography>
              </Box>
            ))
          ) : (
            <Typography>No orders available.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
