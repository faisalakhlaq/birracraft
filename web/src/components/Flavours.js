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
import DialogNewFlavour from './popups/DialogNewFlavour';
import DialogEditFlavour from './popups/DialogEditFlavour';
import DialogDeleteFlavour from './popups/DialogDeleteFlavour';
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


export default function Flavours() {
  const [newModal, setNewModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [flavours, setFlavours] = React.useState([]);
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
      description: row.description,
      price_per_lt: row.price_per_lt,
    });
    setRowSelected(data);
  }

  const handleCloseEdit = () => {
    setEditModal(false);
    }

  React.useEffect(async () => {
    const data = await API_DATA_CALL(
      'GET',
      `/flavour/`
    );
    setFlavours(data);
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item>
          <Typography variant="h4" color="primary">
            Flavours
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
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Description</b></TableCell>
                <TableCell><b>Price per lt</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flavours
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                <TableRow key={row.pk}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.price_per_lt}</TableCell>
                  <TableCell align="right">
                    <Button variant='outlined'
                      size='small' sx={{ mr: 2 }}
                      startIcon={<EditIcon />}
                      onClick={(e) => handleOpenEdit(row, e)}>
                      Edit
                    </Button>
                    <Button variant='contained'
                      size='small'
                      startIcon={<DeleteIcon />}
                      onClick={(e) => handleOpenDelete(row, e)}>
                      Delete
                    </Button>
                  </TableCell>
                  <DialogEditFlavour
                    open={editModal}
                    onClose={handleCloseEdit}
                    row={rowSelected}
                  />
                  <DialogDeleteFlavour
                    open={deleteModal}
                    onClose={handleCloseDelete}
                    row={rowSelected}
                  />
                </TableRow>
              ))}
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 25, 100]}
                  count={flavours.length}
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
      <DialogNewFlavour open={newModal} onClose={handleClose}/>
    </ThemeProvider>
  );
}