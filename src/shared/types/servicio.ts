import { type BaseModel } from "./base";
import type { Reserva } from "./Reserva";

export type Servicio = {
    nombre: string,
    descripcion?: string,
    precio: number,
    DuracionMinutos: number,
    categoria: string,
    reservaciones?: [Reserva] | null,
} & BaseModel;