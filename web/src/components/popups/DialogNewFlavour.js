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

export default function DialogNewFlavour(props) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    return await API_DATA_CALL(
      'POST',
      '/flavour/',
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


  return (
    <Dialog open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <DialogTitle>Create New Flavour</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new flavour to assign to a product.
          </DialogContentText>
          <Grid container>
            <Grid item sx={{ ml: 5 }}>
              <TextField margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                variant="standard"
              />
            </Grid>
            <Grid item sx={{ ml: 5 }}>
              <TextField margin="dense"
                id="price_per_lt"
                name="price_per_lt"
                label="Price per liter"
                type="decimal"
                variant="standard"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item sx={{ ml: 5 }}>
              <TextField margin="dense"
                id="description"
                name="description"
                label="Description"
                type="text"
                variant="standard"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
