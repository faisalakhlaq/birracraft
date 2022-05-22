import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { API_DATA_CALL } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import ModalPopUp from './ModalPopUp';


const theme = createTheme({
	palette: {
		primary: {
			main: '#264118',
		},
	},
});

export default function Profile(){
  const [disable, setDisable] = useState(true);
	const [profile, setProfile] = useState({});
	const [modal, setModal] = useState(false);

	const navigate = useNavigate();

	useEffect(async () => {
		const user = JSON.parse(window.localStorage.getItem('authUser'));
		const data = await API_DATA_CALL(
			'GET',
			`/user/${user.username}/get_user_by_username/`
		).then(response => {
			setProfile(response.fields);
		});
	}, []	);

	const handleEdit = () => {
		setDisable(false);
	}

	const handleClose = () => {
		setModal(false)
		navigate('/');
	};

	const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
		const user = JSON.parse(window.localStorage.getItem('authUser'));
		const response = API_DATA_CALL(
			'PATCH',
			`/user/${user.username}/`,
			{
				'first_name': data.get('firstName'),
				'last_name': data.get('lastName'),
			},
		).then(response => {
			if (response){
				setModal(true);
			} else {
				navigate('/RegistrationFail');
			}
		});
	}

  return (
    <ThemeProvider theme={theme}>
			<Box
				component="form"
				sx={{ 
					'& > :not(style)': { m: 1, pl: 5, pr: 5 },
				}}
				onSubmit={handleSubmit}
				noValidate
				>
				<div>
					<Grid container justifyContent="center">
						<AccountBoxIcon fontSize="large" color="primary"/>
					</Grid>
					<Grid container justifyContent="center">
						<Typography component="h1" variant="h5">
							Profile Data
						</Typography>
					</Grid>
					<Grid container justifyContent="center">
						<Grid item m={2}>
							<TextField id="firstName" name="firstName" label={profile.first_name}
								helperText="First Name"
								disabled={disable} />
						</Grid>
						<Grid item m={2}>
							<TextField id="lastName" name="lastName" label={profile.last_name}
								helperText="Last Name"
								disabled={disable} />
						</Grid>
					</Grid>
					<Grid container justifyContent="center">
						<Grid item m={2}>
							<TextField id="username" name="username" label={profile.username}
								helperText="Username" disabled />
						</Grid>
					</Grid>
					<Grid container justifyContent="center">
						<Grid item m={2}>
							<TextField id="email" name="email" label={profile.email}
								helperText="Email" disabled />
						</Grid>
					</Grid>
					<Grid container justifyContent="center">
						<Grid item m={2}>
							<Button variant='outlined' onClick={handleEdit}>Edit</Button>
						</Grid>
						<Grid item m={2}>
							<Button variant='contained' type="submit" disabled={disable}>Submit</Button>
						</Grid>
					</Grid>
				</div>
			</Box>
      <ModalPopUp open={modal} onClose={handleClose}
        title={'Changes implemented'}
        body={
          'Your profile data was updated.'
        }
        />
		</ThemeProvider>
  )
}