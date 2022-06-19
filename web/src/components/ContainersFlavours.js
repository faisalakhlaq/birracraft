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
import DialogNewCustomer from './popups/DialogNewCustomer';
import DialogEditCustomer from './popups/DialogEditCustomer';
import DialogDeleteCustomer from './popups/DialogDeleteCustomer';
import Containers from './Containers';
import Flavours from './Flavours';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import { API_DATA_CALL } from '../utils/api.js';


const theme = createTheme({
  palette: {
    primary: {
      main: '#264118',
    },
  },
});


export default function ContainersFlavours() {
  const [newModal, setNewModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [containers, setContainers] = React.useState([]);
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
      name: row.name,
      email: row.email,
      cellphone: row.cellphone,
      address: row.address,
      type: row.type
    });
    setRowSelected(data);
  }

  const handleCloseEdit = () => {
    setEditModal(false);
  }

  React.useEffect(async () => {
    const data = await API_DATA_CALL(
      'GET',
      `/container/`
    );
    setContainers(data);
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item md={4}>
          <Containers />
        </Grid>
        <Grid item md={2} />
        <Grid item md={6}>
          <Flavours />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}