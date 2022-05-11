import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function ResetPassSuccess() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" color='green' gutterBottom>
          We just sent you a link to the your email!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Use it to set your new password.
        </Typography>
      </Container>
    </Box>
  );
}
