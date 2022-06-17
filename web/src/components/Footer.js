import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit"
        href="https://github.com/matiseni51/birracraft/" target="_blank">
        Birracraft
      </Link>
      {' '}
      {new Date().getFullYear()}
      {'. All Right Reserved.'}
    </Typography>
  );
}

function SocialMedia() {
  return (
    <Container>
      <Link color='inherit' href='https://facebook.com' target='_blank'>
        <FacebookIcon />
      </Link>
      {'   '}
      <Link color='inherit' href='https://instagram.com' target='_blank'>
        <InstagramIcon />
      </Link>
      {'   '}
      <Link color='inherit' href='https://twitter.com' target='_blank'>
        <TwitterIcon />
      </Link>
      {'   '}
      <Link color='inherit' href='https://web.whatsapp.com' target='_blank'>
        <WhatsAppIcon />
      </Link>
      {'   '}
      <Link color='inherit' href='https://youtube.com' target='_blank'>
        <YouTubeIcon />
      </Link>
    </Container>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 3,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[300]
            : theme.palette.grey[700],
      }}
    >
      <Container maxWidth="sm">
        <SocialMedia />
        <Copyright />
      </Container>
    </Box>
  );
}
