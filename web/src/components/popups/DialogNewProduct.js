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
import ModalPopUp from './ModalPopUp';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function DialogNewProduct(props) {
  const [containers, setContainers] = React.useState([]);
  const [flavours, setFlavours] = React.useState([]);
  const [state, setState] = React.useState("");

  const [ modal, setModal ] = React.useState(false);
  const handleClose = () => setModal(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (props.products.filter(p => p.code === data.get('code')).length > 0){
      setModal(true);
    } else {
      const container = containers.find(c => c.pk == data.get('container'));
      const flavour = flavours.find(f => f.pk == data.get('flavour'));
      return await API_DATA_CALL(
        'POST',
        '/product/',
        {
          'code': data.get('code'),
          'container': data.get('container'),
          'flavour': data.get('flavour'),
          'arrived_date': data.get('arrived_date'),
          'price': (container.liters * flavour.price_per_lt),
          'state': data.get('state'),
        }
      ).then(response => {
        if (response.pk){
          window.location.reload();
        } else {
          navigate('/RegistrationFail');
        }
      });
    };
  };

  React.useEffect(async () => {
    const cont = await API_DATA_CALL(
      'GET',
      `/container/`
    );
    setContainers(cont);
    const flav = await API_DATA_CALL(
      'GET',
      `/flavour/`
    );
    setFlavours(flav);
  }, []);


  return (
    <div>
      <Dialog open={props.open}
        onClose={props.onClose}
        TransitionComponent={Transition}
      >
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a new product.
            </DialogContentText>
            <Grid container>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel>Container</InputLabel>
                <Select id="container"
                  name="container"
                  defaultValue=""
                  label="Container"
                  variant="standard"
                >
                  {containers
                    ?.map((option) => (
                      <MenuItem key={option.pk}
                        value={option.pk}
                      >
                        {option.type} - {option.liters}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel>Flavour</InputLabel>
                <Select id="flavour"
                  name="flavour"
                  defaultValue=""
                  label="Flavour"
                  variant="standard"
                >
                  {flavours
                    ?.map((option) => (
                      <MenuItem key={option.pk}
                        value={option.pk}
                      >
                        {option.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid container justifyContent="center">
              <TextField margin="dense"
                id="code"
                name="code"
                label="Code"
                type="number"
                variant="standard"
                sx={{ m: 2 }}
              />
              <TextField margin="dense"
                id="arrived_date"
                name="arrived_date"
                label="Arrived Date"
                type="date"
                InputLabelProps={{ shrink: true}}
                variant="standard"
                sx={{ m: 2 }}
              />
            </Grid>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel>State</InputLabel>
              <Select id="state"
                name="state"
                label="State"
                variant="standard"
                value={state}
                onChange={(e) => {setState(e.target.value);}}
              >
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="In Transit">In Transit</MenuItem>
                <MenuItem value="Empty">Empty</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <ModalPopUp open={modal}
        onClose={handleClose}
        title={'The product was already created'}
        body={
          'The entered code is currently assign to a product from the list'
        }
      />
    </div>
  );
}
