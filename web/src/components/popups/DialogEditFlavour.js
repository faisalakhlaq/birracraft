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


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function DialogEditFlavour(props) {
	const navigate = useNavigate();

  const handleSubmit = async (event) => {
		event.preventDefault();
    const data = new FormData(event.currentTarget);
		const pk = data.get('pk');
    return await API_DATA_CALL(
			'PATCH',
			`/flavour/${pk}/`,
			{
				'name': data.get('name'),
				'description': data.get('description'),
				'price_per_lt': data.get('price_per_lt'),
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
		'description': '',
		'price_per_lt': '',
		};

	return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
			TransitionComponent={Transition}
    >
			<Box component="form" noValidate onSubmit={handleSubmit}>
				<DialogTitle>Modify selected flavour info</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Edit flavour data.
					</DialogContentText>
					<Grid container>
						<TextField value={data.pk} id="pk" name="pk" 
							sx={{ display: "none" }} />
						<Grid item sx={{ ml: 5 }}>
							<TextField
								margin="dense"
								id="name"
								name="name"
								label={data.name}
								type="text"
								helperText="Name"
								variant="standard"
							/>
						</Grid>
						<Grid item sx={{ ml: 5 }}>
							<TextField
								margin="dense"
								id="price_per_lt"
								name="price_per_lt"
								label={data.price_per_lt}
								type="decimal"
								helperText="Price per liter"
								variant="standard"
							/>
						</Grid>
					</Grid>
					<Grid container justifyContent="center">
						<TextField
							margin="dense"
							id="description"
							name="description"
							label={data.description}
							type="text"
							helperText="Description"
							variant="standard"
						/>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button type="submit">Save</Button>
				</DialogActions>
			</Box>
    </Dialog>
  );
}
