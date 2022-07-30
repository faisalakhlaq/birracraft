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


export default function DialogEditQuota(props) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const pk = data.get('pk');
    return await API_DATA_CALL(
      'PATCH',
      `/quota/${pk}/`,
      {
        'current_quota': data.get('current_quota'),
        'total_quota': data.get('total_quota'),
        'value': data.get('value'),
        'date': data.get('date'),
        'payment': data.get('payment_id'),
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
    'current_quota': '',
    'total_quota': '',
    'value': '',
    'date': '',
  };


  return (
    <Dialog open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <DialogTitle>Modify selected Quota info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit quota data.
          </DialogContentText>
          <Grid container>
            <TextField value={data.pk}
              id="pk"
              name="pk" 
              sx={{ display: "none" }}
            />
            <TextField value={data.payment_id}
              id="payment_id"
              name="payment_id"
              sx={{ display: "none" }}
            />
            <Grid item sx={{ ml: 5 }}>
              <TextField margin="dense"
                id="current_quota"
                name="current_quota"
                label={data.current_quota}
                type="number"
                helperText="Current Quota"
                variant="standard"
              />
            </Grid>
            <Grid item sx={{ ml: 5 }}>
              <TextField margin="dense"
                id="total_quota"
                name="total_quota"
                label={data.total_quota}
                type="number"
                helperText="Total Quotas"
                variant="standard"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sx={{ ml: 5 }}>
              <TextField margin="dense"
                id="value"
                name="value"
                label={data.value}
                type="number"
                helperText="Value"
                variant="standard"
              />
            </Grid>
            <Grid item sx={{ ml: 5 }}>
              <TextField margin="dense"
                id="date"
                name="date"
                label={data.date}
                type="date"
                helperText="Date"
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
