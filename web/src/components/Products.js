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
import DialogNewProduct from './popups/DialogNewProduct';
import DialogDeleteProduct from './popups/DialogDeleteProduct';
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


export default function Products() {
	const [newModal, setNewModal] = React.useState(false);
	const [deleteModal, setDeleteModal] = React.useState(false);
	const [editModal, setEditModal] = React.useState(false);
	const [products, setProducts] = React.useState([]);
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
			`/product/`
		);
		setProducts(data);
	}, []);

	const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
			<Grid container spacing={0}>
				<Grid item md={8} sx={{ textAlign: "left" }}>
					<Typography variant="h3" color="primary">
						Products
					</Typography>
				</Grid>
				<Grid item md={4} sx={{ textAlign: "right" }}>
					<Button variant='contained'
						size='small'
						onClick={() => {navigate('/ContainersFlavours')}}
						startIcon={<SettingsIcon />} >
						Containers & Flavours
					</Button>
				</Grid>
				<Grid item md={8} />
				<Grid item md={4} sx={{ textAlign: "right" }}>
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
								<TableCell><b>Code</b></TableCell>
								<TableCell><b>Container</b></TableCell>
								<TableCell><b>Flavour</b></TableCell>
								<TableCell><b>Arrived Date</b></TableCell>
								<TableCell><b>Price</b></TableCell>
								<TableCell><b>State</b></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => (
								<TableRow key={row.pk}>
									<TableCell>{row.code}</TableCell>
									<TableCell>{row.container}</TableCell>
									<TableCell>{row.flavour}</TableCell>
									<TableCell>{row.arrived_date}</TableCell>
									<TableCell>{row.price}</TableCell>
									<TableCell>{row.state}</TableCell>
									<TableCell align="right">
										<Button variant='contained'
											size='small'
											startIcon={<DeleteIcon />}
											onClick={(e) => handleOpenDelete(row, e)}>
											Delete
										</Button>
									</TableCell>
									<DialogDeleteProduct 
												open={deleteModal}
												onClose={handleCloseDelete}
												row={rowSelected}
												/>
								</TableRow>
							))}
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 25, 100]}
									count={products.length}
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
			<DialogNewProduct open={newModal} onClose={handleClose} products={products} />
		</ThemeProvider>
	);
}