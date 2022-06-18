import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import { API_DATA_CALL } from '../../utils/api';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function DialogDeleteOrder(props) {
  const navigate = useNavigate();

  const handleSubmit = async (event, pk) => {
    event.preventDefault();
    const response = await API_DATA_CALL(
      'DELETE',
      `/order/${pk}/`,
      {
        'id': `${pk}`,
      }
    );
    if (response.status === 204){
      window.location.reload();
    } else {
      navigate('/RegistrationFail');
    };
  };


  return (
    <Dialog open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <Box component="form" noValidate onSubmit={(e) => handleSubmit(e, props.row)}>
        <DialogTitle>Are you sure to delete this Order?</DialogTitle>
        <DialogActions>
          <Button type="submit" variant="contained">Delete</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
