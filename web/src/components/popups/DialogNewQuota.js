import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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

export default function DialogNewQuota(props) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    return await API_DATA_CALL(
      'POST',
      '/quota/',
      {
        'current_quota': data.get('current_quota'),
        'total_quota': data.get('total_quota'),
        'value': data.get('value'),
        'date': data.get('date'),
        'payment': data.get('payment'),
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
        <DialogTitle>Create New Quota</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new quota to assign to a product.
          </DialogContentText>
          <Grid container>
            <Grid item sx={{ ml: 5 }}>
              <TextField margin="dense"
                id="current_quota"
                name="current_quota"
                label="Current Quota"
                type="number"
                variant="standard"
              />
            </Grid>
            <Grid item sx={{ ml: 5 }}>
              <TextField margin="dense"
                id="total_quota"
                name="total_quota"
                label="Total quotas"
                type="number"
                variant="standard"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sx={{ ml: 5 }}>
              <TextField margin="dense"
                id="value"
                name="value"
                label="Value"
                type="decimal"
                variant="standard"
              />
            </Grid>
            <Grid item sx={{ ml: 5 }}>
              <TextField margin="dense"
                id="date"
                name="date"
                label="Date"
                type="date"
                variant="standard"
                InputLabelProps={{ shrink: true }}
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
