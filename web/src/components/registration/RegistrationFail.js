import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';


export default function RegistrationFail() {
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
          Something went wrong...
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'We are going to check this opertaion.'}
        </Typography>
      </Container>
    </Box>
  );
}
