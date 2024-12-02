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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import './styles.css';

const settings = ['Logout'];

export default function MyApp() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [weather, setWeatherData] = React.useState(null);
  const [cartItems, setCartItems] = React.useState([]);
  const [products, setProducts] = React.useState([]);

 {/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
  const slides = [
    { id: 1, image: '/images/donut1SideShow.gif', alt: 'Donut Slide 1' },
    { id: 2, image: '/images/D2SlideShow.gif', alt: 'Donut Slide 2' },
    { id: 3, image: '/images/SlideShow3gif.gif', alt: 'Donut Slide 3' },
  ];
 {/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
  // Fetch weather data
  React.useEffect(() => {
    fetch('http://localhost:3000/api/getWeather')
      .then((res) => res.json())
      .then((data) => setWeatherData(data.temp))
      .catch((err) => console.error('Error fetching weather data:', err));
  }, []);

  // Fetch products data
  React.useEffect(() => {
    fetch('http://localhost:3000/api/getProducts')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  // Fetch cart data
  React.useEffect(() => {
    fetch('http://localhost:3000/api/getCartItems')
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error('Error fetching cart items:', err));
  }, []);

  const handlePreviousSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const addToCart = (product) => {
    fetch('http://localhost:3000/api/putInCart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(() => {
        setCartItems((prev) => [...prev, product]);
        alert(`${product.name} added to cart!`);
      })
      .catch((err) => console.error('Error adding to cart:', err));
  };

 {/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
  return (
    <Box className="page-container">
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Image src="/images/krispy_kreme_logo.gif" alt="Krispy Kreme Logo" width={100} height={100} />

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}>
            <Button color="inherit">
              <Link href="/smallapp">Home</Link>
            </Button>
            <Button color="inherit">
              <Link href="/login">Login</Link>
            </Button>
            <Button color="inherit">
              <Link href="/login">Dashboard</Link>
            </Button>
            <Button color="inherit">
              <Link href="/register">Register</Link>
            </Button>
          </Box>

          <Typography variant="body1" sx={{ ml: 2 }}>
            Today's Temp: {weather !== null ? `${weather}°C` : 'Loading...'}
          </Typography>
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>

 {/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {/* Shopping Cart Icon */}
            <Tooltip title="View Shopping Cart">
           <IconButton
            component={Link}
            href="/shoppingcart" // Redirect to the shopping cart page
             color="inherit"
           >
           <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
                </Badge>
                 </IconButton>
                  </Tooltip>

 {/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

            {/* User Menu */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <div className="slideshow-container">
        <IconButton className="slideshow-button left" onClick={handlePreviousSlide}>
          <ArrowBackIosIcon />
        </IconButton>
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].alt}
          className="slideshow-image"
          style={{ width: '100%', height: 'auto' }}
        />
        <IconButton className="slideshow-button right" onClick={handleNextSlide}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
       
  {/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
      {/* Products Section */}
      <Box sx={{ mt: 4, p: 2, backgroundColor: '#ffe6f0', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#ff4081' }}>Our Products</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
          {products.map((product) => (
            <Box
              key={product.name}
              sx={{
                width: '250px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <Typography variant="h6" sx={{ mt: 1 }}>{product.name}</Typography>
              <Typography variant="body2" sx={{ color: '#888' }}>{product.description}</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>${product.price.toFixed(2)}</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
