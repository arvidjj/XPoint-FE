import { type BaseModel } from "./base";

export const ReservaEstadoEnum = {
  Pendiente: "Pendiente",
  Confirmada: "Confirmada",
  EnProceso: "EnProceso",
  Completada: "Completada",
  Cancelada: "Cancelada",
} as const;

export type ReservaEstadoEnum = keyof typeof ReservaEstadoEnum;

export type Reserva = {
    fecha: string,
    horaInicio?: string,
    horaFin?: string,
    servicioId: number,
    usuarioId?: number,

    precio: number,

    estado: ReservaEstadoEnum,
    notas: string,
} & BaseModel;