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
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DialogDeletePayment from './popups/DialogDeletePayment';
import DialogNewQuota from './popups/DialogNewQuota';
import DialogEditQuota from './popups/DialogEditQuota';
import DialogDeleteQuota from './popups/DialogDeleteQuota';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { API_DATA_CALL } from '../utils/api.js';


const theme = createTheme({
    palette: {
        primary: {
            main: '#264118',
        },
    },
});


export default function Payments() {
  const [newModal, setNewModal] = React.useState(false);
  const [deleteModalP, setDeleteModalP] = React.useState(false);
  const [deleteModalQ, setDeleteModalQ] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [payments, setPayments] = React.useState([]);
  const [quotas, setQuotas] = React.useState([]);
  const [rowSelected, setRowSelected] = React.useState('');
  const [rowSelectedQ, setRowSelectedQ] = React.useState('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [anchorElP, setAnchorElP] = React.useState(null);
  const [anchorElQ, setAnchorElQ] = React.useState(null);
  const openP = Boolean(anchorElP);
  const openQ = Boolean(anchorElQ);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenNew = (e) => {
    setNewModal(true);
  }

  const handleCloseNew = () => {
    setNewModal(false);
  }

  const handleOpenDeleteP = (row, event) => {
    event.preventDefault();
    setDeleteModalP(true);
    setRowSelected(row.pk);
  }

  const handleOpenDeleteQ = (row, event) => {
    event.preventDefault();
    setDeleteModalQ(true);
    setRowSelectedQ(row.id);
  }

  const handleOpenEdit = (row, event) => {
    event.preventDefault();
    setEditModal(true);
    const data = JSON.stringify({
      pk: row.id,
      current_quota: row.current_quota,
      total_quota: row.total_quota,
      value: row.value,
      date: row.date,
      payment_id: row.payment_id,
    });
    setRowSelectedQ(data);
  }

  const handleCloseEdit = () => {
    setEditModal(false);
  }

  const handleViewQuotas = async (row) => {
    const data = await API_DATA_CALL(
      'POST',
      `/quota/list_by_payment/`,
      {
        'payment': row.pk
      }
    );
    setQuotas(data);
  }

  React.useEffect(async () => {
    const data = await API_DATA_CALL(
      'GET',
      `/payment/`
    );
    setPayments(data);
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item>
          <Typography variant="h3" color="primary">
            Payments
          </Typography>
        </Grid>
        <Grid item xs sx={{ textAlign: "right" }}>
          <Typography variant="h3" color="primary">
              Quotas
            </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={5}>
          <Paper sx={{ mt: 3 }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Transaction</b></TableCell>
                    <TableCell><b>Amount</b></TableCell>
                    <TableCell><b>Method</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payments
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((rowP) => (
                    <TableRow key={rowP.pk}>
                      <TableCell>{rowP.transaction}</TableCell>
                      <TableCell>{rowP.amount}</TableCell>
                      <TableCell>{rowP.method}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="more"
                          id="buttonPayment"
                          aria-controls={openP ? 'long-menu' : undefined}
                          aria-expanded={openP ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={(e) => setAnchorElP(e.currentTarget) }
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="menuPayment"
                          MenuListProps={{
                            'aria-labelledby': 'long-button',
                          }}
                          anchorEl={anchorElP}
                          open={openP}
                          onClose={() => setAnchorElP(null)}
                        >
                          <MenuItem onClick={() => setAnchorElP(null)}>
                            <Button variant='text'
                              size='small' sx={{ mr: 2 }}
                              startIcon={<InfoIcon />}
                              onClick={() => handleViewQuotas(rowP)}>
                              View Quotas
                            </Button>
                          </MenuItem>
                          <MenuItem onClick={() => setAnchorElP(null)}>
                            <Button variant='text'
                              size='small'
                              startIcon={<DeleteIcon />}
                              onClick={(e) => handleOpenDeleteP(rowP, e)}>
                              Delete
                            </Button>
                          </MenuItem>
                        </Menu>
                      </TableCell>
                      <DialogDeletePayment
                        open={deleteModalP}
                        onClose={() => setDeleteModalP(false)}
                        row={rowSelected}
                      />
                    </TableRow>
                  ))}
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 25, 100]}
                      count={payments.length}
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
        </Grid>
        <Grid item md={0.5}></Grid>
        <Grid item md={6}>
          <Paper sx={{ mt: 3 }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Quota number</b></TableCell>
                    <TableCell><b>Total quotas</b></TableCell>
                    <TableCell><b>Value</b></TableCell>
                    <TableCell><b>Date</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quotas
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((rowQ) => (
                    <TableRow key={rowQ.id}>
                      <TableCell>{rowQ.current_quota}</TableCell>
                      <TableCell>{rowQ.total_quota}</TableCell>
                      <TableCell>{rowQ.value}</TableCell>
                      <TableCell>{rowQ.date}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="more"
                          id="buttonQuota"
                          aria-controls={openQ ? 'long-menu' : undefined}
                          aria-expanded={openQ ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={(e) => setAnchorElQ(e.currentTarget)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="menuQuota"
                          MenuListProps={{
                            'aria-labelledby': 'long-button',
                          }}
                          anchorEl={anchorElQ}
                          open={openQ}
                          onClose={() => setAnchorElQ(null)}
                        >
                          <MenuItem onClick={() => setAnchorElQ(null)}>
                            <Button variant='text'
                              size='small' sx={{ mr: 2 }}
                              startIcon={<AddCircleIcon />}
                              onClick={(e) => handleOpenNew(e)}>
                              New
                            </Button>
                          </MenuItem>
                          <MenuItem onClick={() => setAnchorElQ(null)}>
                            <Button variant='text'
                              size='small' sx={{ mr: 2 }}
                              startIcon={<EditIcon />}
                              onClick={(e) => handleOpenEdit(rowQ, e)}>
                              Edit
                            </Button>
                          </MenuItem>
                          <MenuItem onClick={() => setAnchorElQ(null)}>
                            <Button variant='text'
                              size='small'
                              startIcon={<DeleteIcon />}
                              onClick={(e) => handleOpenDeleteQ(rowQ, e)}>
                              Delete
                            </Button>
                          </MenuItem>
                        </Menu>
                      </TableCell>
                      <DialogNewQuota
                        open={newModal}
                        onClose={handleCloseNew}
                      />
                      <DialogEditQuota
                        open={editModal}
                        onClose={handleCloseEdit}
                        row={rowSelectedQ}
                      />
                      <DialogDeleteQuota
                        open={deleteModalQ}
                        onClose={() => setDeleteModalQ(false)}
                        row={rowSelectedQ}
                      />
                    </TableRow>
                  ))}
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 25, 100]}
                      count={payments.length}
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
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}