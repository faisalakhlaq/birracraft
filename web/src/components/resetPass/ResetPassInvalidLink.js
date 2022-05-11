import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function ResetPassInvalidLink() {
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
          {'The link used is invalid. Try again from the begging.'}
        </Typography>
      </Container>
    </Box>
  );
}
