import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { API_DATA_CALL } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import ModalPopUp from './popups/ModalPopUp';
import ArticleIcon from '@mui/icons-material/Article';


const theme = createTheme({
	palette: {
		primary: {
			main: '#264118',
		},
	},
});

export default function Report(){
	const [modal, setModal] = useState(false);

	const navigate = useNavigate();

	const handleClose = () => {
		setModal(false)
		navigate('/');
	};

	const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
		const response = API_DATA_CALL(
			'POST',
			`/report/report/`,
			{
				'date_from': data.get('dateFrom'),
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
					<Grid container justifyContent="center" sx={{ m: 2 }}>
						<ArticleIcon fontSize="large" color="primary"/>
					</Grid>
					<Grid container justifyContent="center">
						<Typography component="h1" variant="h5">
							Report
						</Typography>
					</Grid>
					<Grid container justifyContent="center" sx={{ m: 2 }}>
						<Typography component="h1" variant="h6">
							Set the date as a start point to recover the information
						</Typography>
					</Grid>
					<Grid container justifyContent="center" sx={{ m: 2 }}>
							<TextField id="dateFrom" name="dateFrom" 
								helperText="Date From" type="date" />
					</Grid>
					<Button type="submit" variant="contained">Generate Report</Button>
			</Box>
      <ModalPopUp open={modal} onClose={handleClose}
        title={'Report sent'}
        body={
          'Check your inbox.'
        }
        />
		</ThemeProvider>
  )
}