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

export default function DialogNewPayment(props) {
  const [method, setMethod] = React.useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const responseP = await API_DATA_CALL(
      'POST',
      '/payment/',
      {
        'amount': data.get('amount'),
        'method': data.get('method'),
        'order': props.row,
      }
    );
    if (responseP.pk){
      const responseQ = await API_DATA_CALL(
        'POST',
        '/quota/',
        {
          'current_quota': data.get('currentQuota'),
          'total_quota': data.get('totalQuota'),
          'value': data.get('quotaValue'),
          'date': data.get('date'),
          'payment': responseP.pk,
        }
      );
      if (responseQ.pk){ navigate('/Payments');
      } else { navigate('/RegistrationFail'); }
    } else { navigate('/RegistrationFail'); }
  };


  return (
    <Dialog open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <DialogTitle>Add Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the payment data to the selected order.
          </DialogContentText>
          <Grid container justifyContent="center">
            <Grid item sx={{ width: "30%" }}>
              <TextField margin="dense"
                id="amount"
                name="amount"
                label="Amount"
                type="decimal"
                variant="standard"
              />
            </Grid>
            <Grid item sx={{ width: "50%", mt: 1, ml: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Method</InputLabel>
                <Select id="method"
                  name="method"
                  label="method"
                  variant="standard"
                  value={method}
                  onChange={(e) => {setMethod(e.target.value);}}
                >
                  <MenuItem value="Debit Card">Debit Card</MenuItem>
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="Digital Wallet">Digital Wallet</MenuItem>
                  <MenuItem value="Cryptocurrency">Cryptocurrency</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <DialogContentText sx={{ mt: 3 }}>
            Quota/s Information.
          </DialogContentText>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={3}>
              <TextField margin="dense"
                id="currentQuota"
                name="currentQuota"
                label="Current Quota"
                type="number"
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField margin="dense"
                id="totalQuota"
                name="totalQuota"
                label="Total Quota"
                type="number"
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField margin="dense"
                id="quotaValue"
                name="quotaValue"
                label="Value"
                type="decimal"
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={2}>
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
