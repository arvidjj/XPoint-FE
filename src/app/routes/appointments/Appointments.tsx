
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import { GetAllReservasQuery } from '../../../features/reservas/get-reservas';


export default function Appointments() {

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Appointments
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Appointment
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="appointments table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <GetAllReservasQuery>
                {(query) => {
                  if (query.isLoading) return <div>Cargando...</div>;
                  if (query.error) return <div>Error al cargar</div>;

                  return (
                    <ul>
                      {query.data?.map((reserva) => (
                        <li key={reserva.id}>{reserva.fecha} - {reserva.estado}</li>
                      ))}
                    </ul>
                  );
                }}
              </GetAllReservasQuery>

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
