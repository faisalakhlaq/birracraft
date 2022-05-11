import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, Container, Link, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { API_NOAUTH_CALL } from '../../utils/api.js';
import { useNavigate } from 'react-router-dom';


const theme = createTheme({
    palette: {
      primary: {
        main: '#264118',
      },
    },
  });

export default function ResetPassForm() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('newPassword') === data.get('newPasswordConfirm')){
      const response = API_NOAUTH_CALL('/user/set_new_pass/', {
        'username': data.get('username'),
        'password': data.get('newPassword'),
      }).then(response => {
        if (response.status === 200){
          navigate('/ResetPassSuccess');
        } else {
          navigate('/ResetPassFail');
        }
      })};
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          component="form"
          onSubmit={handleSubmit}
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
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            sx={{ mt: 2 }}
            />
          <TextField
            required
            fullWidth
            id="newPassword"
            type="password"
            label="New Password"
            name="newPassword"
            autoComplete="newPassword"
            sx={{ mt: 2 }}
            />
          <TextField
            required
            fullWidth
            id="newPasswordConfirm"
            type="password"
            label="Confirm New Password"
            name="newPasswordConfirm"
            autoComplete="newPasswordConfirm"
            sx={{ mt: 2 }}
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
       </Container>
    </ThemeProvider>
  );
}