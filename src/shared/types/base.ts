import { type UseMutationOptions, type UseMutationResult, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";


//Base Types
export type BaseModel = {
    id: string,
    creadoPor: string,
    modificadoPor: string,
    fechaCreacion: string,
    fechaModificacion: string,
    fechaEliminacion: string,
}

export interface BaseQuery {
    page?: number,
    pageSize?: number
}

export interface QueryResponse<T = any> {
    result: T[],
    page: number,
    pageSize: number,
    count: number
}

//API Helper Types
export type QueryConfig<T = any> = Omit<UseQueryOptions<T, Error, T, any>, "queryFn" | "queryKey">;
export type MutationConfig<T = any, V = any> = Omit<UseMutationOptions<T, Error, V, unknown>, "mutationFn">;
export type QueryResult<T = any> = UseQueryResult<T, Error>;
export type MutationResult<T = any, V = any> = UseMutationResult<T, Error, V, unknown>;