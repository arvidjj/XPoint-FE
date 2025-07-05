import {
  Button,
  FormGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { z } from "zod/v4";
import type { CreateServicioRequest } from "../create-servicio";

const createServicioSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
  precio: z.number().positive("El precio debe ser un número positivo"),
  duracionMinutos: z.number().positive("La duración debe ser un número positivo"),
  categoria: z.string().min(1, "La categoría es requerida"),
});

type CreateServicioProps = {
  onSubmit: (data: CreateServicioRequest) => void;
  disabled?: boolean;
};

export const CreateServicio = ({ onSubmit, disabled }: CreateServicioProps) => {
  const form = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      precio: 1,
      duracionMinutos: 30,
      categoria: "",
    } as CreateServicioRequest,
    validators: {
      onBlur: createServicioSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted with values:", value);
      onSubmit(value);
    },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
      <Stack spacing={2}>
        {/** Nombre */}
        <form.Field name="nombre">
          {(field) => (
            <TextField
              label="Nombre del servicio"
              variant="outlined"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={disabled}
              error={field.state.meta.errors.length > 0}
              helperText={
                field.state.meta.errors
                  .map((e) => typeof e === "string" ? e : (e?.message || String(e)))
                  .join(", ") || " "
              }
            />
          )}
        </form.Field>

        {/** Descripción */}
        <form.Field name="descripcion">
          {(field) => (
            <TextField
              label="Descripción del servicio"
              variant="outlined"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={disabled}
              helperText={
                field.state.meta.errors
                  .map((e) => typeof e === "string" ? e : (e?.message || String(e)))
                  .join(", ") || " "
              }
            />
          )}
        </form.Field>

        {/** Precio */}
        <form.Field name="precio">
          {(field) => (
            <TextField
              label="Precio"
              variant="outlined"
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              disabled={disabled}
              error={field.state.meta.errors.length > 0}
              helperText={
                field.state.meta.errors
                  .map((e) => typeof e === "string" ? e : (e?.message || String(e)))
                  .join(", ") || " "
              }
            />
          )}
        </form.Field>

        {/** Duración */}
        <form.Field name="duracionMinutos">
          {(field) => (
            <TextField
              label="Duración (minutos)"
              variant="outlined"
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              disabled={disabled}
              error={field.state.meta.errors.length > 0}
              helperText={
                field.state.meta.errors
                  .map((e) => typeof e === "string" ? e : (e?.message || String(e)))
                  .join(", ") || " "
              }
            />
          )}
        </form.Field>

        {/** Categoría */}
        <form.Field name="categoria" >
          {(field) => (
            <TextField
              label="Categoría"
              variant="outlined"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={disabled}
              error={field.state.meta.errors.length > 0}
              helperText={
                field.state.meta.errors
                  .map((e) => typeof e === "string" ? e : (e?.message || String(e)))
                  .join(", ") || " "
              }
            />
          )}
        </form.Field>

        <FormGroup>
          <Button type="submit" variant="contained" disabled={disabled}>
            Crear Servicio
          </Button>
        </FormGroup>
      </Stack>
    </form>
  );
};
