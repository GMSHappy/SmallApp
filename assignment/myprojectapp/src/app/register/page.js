'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './styles.css'; // Import the CSS file

export default function Home() {
  const handleSubmit = async (event) => {
    console.log("Handling submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email');
    let username = data.get('username');
    let pass = data.get('pass');

    console.log("Sent email:", email);
    console.log("Sent username:", username);
    console.log("Sent pass:", pass);

    await runDBCallAsync(`http://localhost:3000/api/reg?email=${email}&username=${username}&pass=${pass}`);
  };

  async function runDBCallAsync(url) {
    try {
      const res = await fetch(url, { method: 'GET' });
      const data = await res.json();
      if (data.data === "valid") {
        console.log("Registration is valid!");
      } else {
        console.log("Registration not valid");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  }

  return (
    <Container maxWidth="sm" className="form-container">
      <Box component="form" onSubmit={handleSubmit} noValidate className="form-box">
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          className="text-field"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          className="text-field"
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
          className="text-field"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}
