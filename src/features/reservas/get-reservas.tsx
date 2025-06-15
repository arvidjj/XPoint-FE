import { useQuery } from '@tanstack/react-query';
import api from "../../api/api";
import { type Reserva } from '../../shared/types/Reserva';
import { type ReactNode } from 'react';



export async function getAllReservas(): Promise<Reserva[]> {
    const response = await api.get("Reserva");
    return response.data;
}

export function useGetReservas() {
    return useQuery({
        queryKey: ["reservas"],
        queryFn: () => getAllReservas(),
    });
}

export interface GetAllReservasQueryProps {
    children: (queryResult: ReturnType<typeof useGetReservas>) => ReactNode;
}

export function GetAllReservasQuery({ children }: GetAllReservasQueryProps) {
    const queryResult = useGetReservas();
    return <>{children(queryResult)}</>;
}
