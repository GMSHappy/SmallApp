'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './styles.css';

export default function Home() {
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const pass = data.get('pass');

    console.log("Attempting login with:", email, pass);

    const url = `http://localhost:3000/api/login?email=${email}&pass=${pass}`;

    try {
      const res = await fetch(url);
      const result = await res.json();

      if (result.data === "valid") {
        console.log("Login successful!");

        if (result.role === "manager") {
          // Redirect to manager dashboard
          window.location.href = '/MangerPage';
        } else {
          // Redirect to customer dashboard
          window.location.href = '/smallapp';
        }
      } else if (result.data === "invalid") {
        alert("Invalid login credentials. Please try again.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Unable to process login at this time.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Password"
            type="password"
            id="pass"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
