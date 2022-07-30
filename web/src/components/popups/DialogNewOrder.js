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
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import { API_DATA_CALL } from '../../utils/api';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogNewOrder(props) {
  const [products, setProducts] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [state, setState] = React.useState('');
  const [productSelected, setProductSelected] = React.useState([]);
  const [price, setPrice] = React.useState(0);
  const [totalAmount, setTotalAmount] = React.useState(0);

  const navigate = useNavigate();


  const handleChange = (event: SelectChangeEvent<typeof productSelected>) => {
    const {
      target: { value },
    } = event;
    setProductSelected(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const productPKs = [];
    products.map(p => {
      if (productSelected.includes(p.code)) {
        productPKs.push(p.pk);
      }
    });

    return await API_DATA_CALL(
      'POST',
      '/order/',
      {
        'date': data.get('date'),
        'products': productPKs,
        'price': data.get('price'),
        'delivery_cost': data.get('deliveryCost'),
        'total_amount': data.get('totalAmount'),
        'customer': data.get('customer'),
        'state': data.get('state'),
        'comment': data.get('comment'),
      }
    ).then(response => {
      if (response.pk) {
        window.location.reload();
      } else {
        navigate('/RegistrationFail');
      }
    });
  };

  React.useEffect(async () => {
    const productsList = await API_DATA_CALL(
      'GET',
      `/product/`
    );
    const customersList = await API_DATA_CALL(
      'GET',
      `/customer/`
    );
    const productsInStock = productsList.filter(
      product => product.state === "In Stock"
    );
    setProducts(productsInStock);
    setCustomers(customersList);
  }, []);


  React.useEffect(async () => {
    const priceSum = [];
    productSelected.map(ps => {
      priceSum.push(
        parseFloat(products.find(p => p.code == ps).price)
      );
      setPrice(priceSum.reduce(
        (previousValue, currentValue) => previousValue + currentValue, 0
      ));
    });
  }, [productSelected]);


  return (
    <Dialog open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <DialogTitle>Create New Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Generate a new order.
          </DialogContentText>
          <Grid container>
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel>Product</InputLabel>
              <Select multiple
                id="product"
                name="product"
                value={productSelected}
                onChange={handleChange}
                variant="standard"
                renderValue={(selected) => (
                  <Box>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {products.map((option) => (
                  <MenuItem key={option.pk}
                    value={option.code}
                  >
                    {option.code} ({option.container} {option.flavour})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel>Customers</InputLabel>
              <Select id="customer"
                name="customer"
                defaultValue=""
                label="Customer"
                variant="standard"
              >
                {customers
                  ?.map((option) => (
                    <MenuItem key={option.pk}
                      value={option.pk}>
                      {option.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid container justifyContent="center">
            <TextField margin="dense"
              id="price"
              name="price"
              label="Price"
              type="decimal"
              value={price}
              variant="standard"
              sx={{ m: 2, width: "25%" }}
            />
            <TextField margin="dense"
              id="deliveryCost"
              name="deliveryCost"
              label="Delivery Cost"
              type="decimal"
              onChange={(e) => {setTotalAmount(
                price + parseFloat(e.target.value)
              );}}
              variant="standard"
              sx={{ m: 2, width: "25%" }}
            />
            <TextField margin="dense"
              id="totalAmount"
              name="totalAmount"
              label="Total Amount"
              type="decimal"
              value={totalAmount}
              variant="standard"
              sx={{ m: 2, width: "25%" }}
            />
          </Grid>
          <Grid container justifyContent="center">
            <TextField margin="dense"
              id="date"
              name="date"
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="standard"
              sx={{ m: 2 }}
            />
            <FormControl sx={{ width: "50%", m: 2 }}>
              <InputLabel>State</InputLabel>
              <Select id="state"
                name="state"
                label="State"
                variant="standard"
                value={state}
                onChange={(e) => { setState(e.target.value); }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="In Quotas">In Quotas</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container justifyContent="center">
            <TextField fullWidth
              margin="dense"
              id="comment"
              name="comment"
              label="Comment"
              type="text"
              InputLabelProps={{ shrink: true }}
              variant="standard"
              sx={{ m: 2 }}
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
