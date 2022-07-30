import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogNewOrder from './popups/DialogNewOrder';
import DialogDeleteOrder from './popups/DialogDeleteOrder';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { API_DATA_CALL } from '../utils/api.js';
import DialogNewPayment from './popups/DialogNewPayment';


const theme = createTheme({
  palette: {
    primary: {
      main: '#264118',
    },
  },
});


export default function Orders() {
  const [newModal, setNewModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [paymentModal, setPaymentModal] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [rowSelected, setRowSelected] = React.useState('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setNewModal(true);
  }

  const handleClose = () => {
    setNewModal(false);
  }

  const handleOpenPayment = (row, event) => {
    event.preventDefault();
    setPaymentModal(true);
    setRowSelected(row.pk);
  }

  const handleClosePayment = () => {
    setPaymentModal(false);
  }

  const handleOpenDelete = (row, event) => {
    event.preventDefault();
    setDeleteModal(true);
    setRowSelected(row.pk);
  }

  const handleCloseDelete = () => {
    setDeleteModal(false);
  }

  React.useEffect(async () => {
    const data = await API_DATA_CALL(
      'GET',
      `/order/`
    );
    if (data){
      const pays = await API_DATA_CALL(
        'GET',
        `/payment/`
      );
      data.map((o) => {
        const payment = pays.find(p => p.order == o.pk);
        if (payment){
          o['payment'] = payment.transaction;
        } else {
          o['payment'] = null;
        }
      });
    };
    setOrders(data);
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item>
          <Typography variant="h3" color="primary">
            Orders
          </Typography>
        </Grid>
        <Grid item xs sx={{ textAlign: "right" }}>
          <Button variant='contained'
            size='small' onClick={handleOpen}
            startIcon={<AddCircleIcon />} >
            New
          </Button>
        </Grid>
      </Grid>
      <Paper sx={{ mt: 3 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Products</b></TableCell>
                <TableCell><b>Price</b></TableCell>
                <TableCell><b>Delivery cost</b></TableCell>
                <TableCell><b>Total amount</b></TableCell>
                <TableCell><b>Customer</b></TableCell>
                <TableCell><b>Payment transaction</b></TableCell>
                <TableCell><b>State</b></TableCell>
                <TableCell><b>Comment</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                <TableRow key={row.pk}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.products.map(
                      p => p+', '
                    )}
                  </TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.delivery_cost}</TableCell>
                  <TableCell>{row.total_amount}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.payment}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.comment}</TableCell>
                  <TableCell align="right">
                    <Button variant='outlined'
                      size='small'
                      startIcon={<AddCircleIcon />}
                      onClick={(e) => handleOpenPayment(row, e)}>
                      Payment
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant='contained'
                      size='small'
                      startIcon={<DeleteIcon />}
                      onClick={(e) => handleOpenDelete(row, e)}>
                      Delete
                    </Button>
                  </TableCell>
                  <DialogNewPayment
                    open={paymentModal}
                    onClose={handleClosePayment}
                    row={rowSelected}
                  />
                  <DialogDeleteOrder
                    open={deleteModal}
                    onClose={handleCloseDelete}
                    row={rowSelected}
                  />
                </TableRow>
              ))}
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 25, 100]}
                  count={orders.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <DialogNewOrder open={newModal} onClose={handleClose}/>
    </ThemeProvider>
  );
}