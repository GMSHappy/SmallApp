'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './shoppingCart.css';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [userEmail, setUserEmail] = useState('Girishsuneram6@gmail.com'); 

  useEffect(() => {
    fetch('http://localhost:3000/api/getCartItems')
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        calculateTotal(data);
      })
      .catch((err) => console.error('Error fetching cart items:', err));
  }, []);

  const calculateTotal = (items) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalPrice);
  };

  const removeFromCart = (id) => {
    fetch(`http://localhost:3000/api/removeFromCart?id=${id}`, { method: 'DELETE' })
      .then(() => {
        const updatedCart = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
      })
      .catch((err) => console.error('Error removing item:', err));
  };

  const handleCheckout = () => {
    fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail }), 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Checkout complete! An email has been sent to you.');
          setCartItems([]); 
          setTotal(0);
        } else {
          alert(`Checkout failed: ${data.error}`);
        }
      })
      .catch((err) => {
        console.error('Error during checkout:', err);
        alert('There was an error during checkout. Please try again.');
      });
  };

  return (
    <Box className="cart-page" sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <Box>
          {cartItems.map((item) => (
            <Box
              key={item._id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                p: 2,
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={item.image || '/placeholder.png'} // Default image if item.image is null
                  alt={item.name || 'Product'}
                  style={{ width: '80px', height: '80px', borderRadius: '8px', marginRight: '16px' }}
                />
                <Box>
                  <Typography variant="h6">{item.name || 'Unnamed Product'}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description || 'No description available.'}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    ${item.price ? item.price.toFixed(2) : '0.00'}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                color="error"
                onClick={() => removeFromCart(item._id)}
                aria-label="Remove"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ${total.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
}
