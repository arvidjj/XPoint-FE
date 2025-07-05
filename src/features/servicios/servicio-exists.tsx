import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export interface ServicioExistsResponse {
    exists: boolean;
}


async function servicioExists(): Promise<ServicioExistsResponse> {
    const response = await api.get("Servicio/exists");
    return response.data;
  }

  export function useServicioExists() {
    return useQuery({
      queryKey: ["servicioExists"],
      queryFn: servicioExists,
    });
  }
