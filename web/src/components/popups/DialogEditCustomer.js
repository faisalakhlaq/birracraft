import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { API_DATA_CALL } from '../../utils/api';
import { FormHelperText } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function DialogEditCustomer(props) {
	const [type, setType] = React.useState(
		props.row ? JSON.parse(props.row).type : ''
	);

	const navigate = useNavigate();

  const handleSubmit = async (event) => {
		event.preventDefault();
    const data = new FormData(event.currentTarget);
		const pk = data.get('pk');
    return await API_DATA_CALL(
			'PATCH',
			`/customer/${pk}/`,
			{
				'name': data.get('name'),
				'email': data.get('email'),
				'cellphone': data.get('phone'),
				'address': data.get('address'),
				'type': data.get('type'),
			}
		).then(response => {
      if (response.pk){
				window.location.reload();
      } else {
				navigate('/RegistrationFail');
      }
    });
  };

	const data = props.row ? JSON.parse(props.row) : {
		'pk': '',
		'name': '',
		'email': '',
		'cellphone': '',
		'address': '',
		'type': ''
		};

	return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
			TransitionComponent={Transition}
    >
			<Box component="form" noValidate onSubmit={handleSubmit}>
				<DialogTitle>Edit selected customer</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Edit client data.
					</DialogContentText>
					<TextField value={data.pk} id="pk" name="pk" 
						sx={{ display: "none" }} />
					<Grid container>
						<Grid item sx={{ ml: 5 }}>
							<TextField
								margin="dense"
								id="name"
								name="name"
								label={data.name}
								type="text"
								variant="standard"
								helperText="Name"
							/>
						</Grid>
						<Grid item sx={{ ml: 5 }}>
							<TextField
								margin="dense"
								id="email"
								name="email"
								label={data.email}
								type="email"
								variant="standard"
								helperText="Email Address"
							/>
						</Grid>
						<Grid item sx={{ ml: 5 }}>
							<TextField
								margin="dense"
								id="phone"
								name="phone"
								label={data.cellphone}
								type="text"
								variant="standard"
								helperText="Phone Number"
							/>
						</Grid>
						<Grid item sx={{ ml: 5 }}>
							<TextField
								margin="dense"
								id="address"
								name="address"
								label={data.address}
								type="text"
								variant="standard"
								helperText="Address"
							/>
						</Grid>
					</Grid>
					<Grid container justifyContent="center">
						<FormControl sx={{ width: "80%", mt: 3 }}>
							<InputLabel>{data.type}</InputLabel>
							<Select id="type" name="type" variant="standard"
								value={type} onChange={(e) => {setType(e.target.value);}}>
								<MenuItem value="Particular">Particular</MenuItem>
								<MenuItem value="Comerce">Comerce</MenuItem>
							</Select>
							<FormHelperText>Type</FormHelperText>
						</FormControl>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button type="submit">Save</Button>
				</DialogActions>
			</Box>
    </Dialog>
  );
}
