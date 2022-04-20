import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, Container, Link, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit"
        href="https://github.com/matiseni51/birracraft/" target="_blank">
        Birracraft
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
    palette: {
      primary: {
        main: '#264118',
      },
    },
  });

export default function ResetPass() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Reset password
          </Typography>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Send
            </Button>
          </Box>
          <Copyright sx={{ mt: 5 }} />
       </Container>
    </ThemeProvider>
  );
}