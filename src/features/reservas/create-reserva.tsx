import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "../../api/api";

export interface CreateReservaRequest {
    fecha: Date;
    horaInicio: string;
    horaFin: string;
    usuarioId: string;
    precio: number;
    notas: string;
    servicioId: string;
}

async function postReserva(reserva: CreateReservaRequest): Promise<CreateReservaRequest> {
    ///reserva/{servicioId}
    const response = await api.post(`Reserva/${reserva.servicioId}`, reserva);
  return response.data;
}

export function useCreateReserva() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postReserva,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservas"] });
    },
  });
}