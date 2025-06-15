import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "../../api/api";
import { type ReactNode } from 'react';

export interface CreateServicioRequest {
    nombre: string;
    descripcion?: string;
    precio: number;
    duracionMinutos: number;
    categoria: string;
}


async function postServicio(servicio: CreateServicioRequest): Promise<CreateServicioRequest> {
  const response = await api.post("Servicio", servicio);
  return response.data;
}

export function useCreateServicio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postServicio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servicios"] });
    },
  });
}

export interface CreateServicioMutationProps {
  children: (mutationResult: ReturnType<typeof useCreateServicio>) => ReactNode;
}

export function CreateServicioMutation({ children }: CreateServicioMutationProps) {
  const mutation = useCreateServicio();
  return <>{children(mutation)}</>;
}