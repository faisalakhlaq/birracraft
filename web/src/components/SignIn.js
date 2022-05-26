import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import sativa_banner from '../resources/sativa_banner2.jpg';
import ModalPopUp from './popups/ModalPopUp';
import { API_AUTH_CALL } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';


const theme = createTheme({
    palette: {
      primary: {
        main: '#264118',
      },
    },
  });

export default function SignIn() {
  const navigate = useNavigate();

  const [ modal, setModal ] = React.useState(false);

  const handleClose = () => setModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    return await API_AUTH_CALL(data.get('username'), data.get('password'))
      .then(response => {
        if (response.status === 200){
          navigate('/Orders');
        } else {
          setModal(true);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '80vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${sativa_banner})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/ResetPass" style={{
                    color: 'inherit',
                    textDecoration: 'inherit',
                    }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs>
                  <Link to="/SignUp" style={{
                    color: 'inherit',
                    textDecoration: 'inherit',
                    }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ModalPopUp open={modal} onClose={handleClose}
        title={'User/Password incorrect'}
        body={
          'The input data is incorrect. Check that the credentials used'
        }
        />
    </ThemeProvider>
  );
}