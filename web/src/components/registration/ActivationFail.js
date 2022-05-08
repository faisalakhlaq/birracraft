import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';


export default function ActivationFail() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" color='red' gutterBottom>
          Verification failed!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'It seems some data that you provide were previously supply'}
        </Typography>
      </Container>
    </Box>
  );
}
