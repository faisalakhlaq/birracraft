import * as React from 'react';
import Link from '@mui/material/Link';
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
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import DialogNewOrder from './popups/DialogNewOrder';
import DialogDeleteOrder from './popups/DialogDeleteOrder';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import { API_DATA_CALL } from '../utils/api.js';
import { useNavigate } from 'react-router-dom';


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
  const [editModal, setEditModal] = React.useState(false);
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

  const handleOpenDelete = (row, event) => {
    event.preventDefault();
    setDeleteModal(true);
    setRowSelected(row.pk);
  }

  const handleCloseDelete = () => {
    setDeleteModal(false);
  }

  const handleOpenEdit = (row, event) => {
    event.preventDefault();
    setEditModal(true);
    const data = JSON.stringify({
      pk: row.pk,
      data: row.data,
      products: row.products,
      price: row.price,
      delivery_cost: row.delivery_cost,
      total_amount: row.total_amount,
      customer: row.customer,
      payment: row.payment,
      state: row.state,
      comment: row.comment,
    });
    setRowSelected(data);
  }

  const handleCloseEdit = () => {
    setEditModal(false);
  }

  React.useEffect(async () => {
    const data = await API_DATA_CALL(
    'GET',
    `/order/`
    );
    setOrders(data);
  }, []);

  const navigate = useNavigate();


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
                <TableCell><b>Payment</b></TableCell>
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
                    <Button variant='contained'
                      size='small'
                      startIcon={<DeleteIcon />}
                      onClick={(e) => handleOpenDelete(row, e)}>
                      Delete
                    </Button>
                  </TableCell>
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