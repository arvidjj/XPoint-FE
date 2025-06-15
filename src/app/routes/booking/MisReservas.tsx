import { Paper, Typography } from "@mui/material";
import { GetAllReservasQuery } from "../../../features/reservas/get-reservas";

const MisReservas = () => {


    return (
        <div>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    Mis reservas
                </Typography>

                <Typography variant="body1" gutterBottom textAlign="left" sx={{ fontStyle: 'italic' }}>
                    5 días hasta tu próxima reserva
                </Typography>

                <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                    <GetAllReservasQuery>
                        {(query) => {
                            if (query.isLoading) return <div>Cargando...</div>;
                            if (query.error) return <div>Error al cargar</div>;
                            if (query.isPending) return <div>Esperando...</div>;

                            return (
                                <ul>
                                    {query.data?.map((reserva) => (
                                        <li key={reserva.id}>{reserva.fecha} - {reserva.estado}</li>
                                    ))}
                                </ul>
                            );
                        }}
                    </GetAllReservasQuery>
                </div>

            </Paper>
        </div>
    );
}

export default MisReservas;