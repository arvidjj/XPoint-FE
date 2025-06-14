import { Card, CardContent, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GetAllReservasQuery } from "../../../features/reservas/get-reservas";

const reservasDummy = [
    {
        fecha: "2025-06-07",
        hora: "14:00",
        servicio: "Cita de seguimiento"
    },
    {
        fecha: "2025-06-08",
        hora: "16:00",
        servicio: "Cita de seguimiento"
    }
]

const MisReservas = () => {

    const [reservas, setReservas] = useState<any[]>([]);
    const [lastestReserva, setLastestReserva] = useState<any>(null);

    useEffect(() => {
        setReservas(reservasDummy);
    }, []);

    const getLastestReserva: any = () => {
        const lastest = reservas.sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())[0];
        return lastest;
    }

    useEffect(() => {
        setLastestReserva(getLastestReserva());
    }, [reservas]);

    const getDateTimeUntilReserva = (reserva: any) => {
        const now = new Date();
        const reservaDate = new Date(reserva.fecha + ' ' + reserva.hora);
        const diffTime = Math.abs(reservaDate.getTime() - now.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    return (
        <div>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    Mis reservas
                </Typography>

                {lastestReserva && <Typography variant="body1" gutterBottom textAlign="left" sx={{ fontStyle: 'italic' }}>
                    {getDateTimeUntilReserva(lastestReserva)} {getDateTimeUntilReserva(lastestReserva) === 1 ? 'día' : 'días'} hasta tu próxima reserva
                </Typography>}

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