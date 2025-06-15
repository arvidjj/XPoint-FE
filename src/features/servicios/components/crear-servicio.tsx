import {
  Button,
  FormGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";

export const CreateServicio = () => {
  const form = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      precio: 0,
      duracionMinutos: 0,
      categoria: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Servicio creado:", value);
    },
  });

  return (
    <form onSubmit={(e) => {e.preventDefault();form.handleSubmit();}}>
      <Stack spacing={2}>
        {/** Nombre */}
        <form.Field
          name="nombre"
          validators={{
            onChange: ({ value }) =>
              value.trim() === "" ? "El nombre es requerido" : undefined,
          }}
        >
          {(field) => (
            <TextField
              label="Nombre del servicio"
              variant="outlined"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors.length > 0}
              helperText={field.state.meta.errors.join(", ") || " "}
            />
          )}
        </form.Field>

        {/** Descripción */}
        <form.Field name="descripcion">
          {(field) => (
            <TextField
              label="Descripción del servicio"
              variant="outlined"
              multiline
              rows={3}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        {/** Precio */}
        <form.Field
          name="precio"
          validators={{
            onChange: ({ value }) => {
              return isNaN(value) || value <= 0
                ? "El precio debe ser un número positivo"
                : undefined;
            },
          }}
        >
          {(field) => (
            <TextField
              label="Precio"
              variant="outlined"
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors.length > 0}
              helperText={field.state.meta.errors.join(", ") || " "}
            />
          )}
        </form.Field>

        {/** Duración */}
        <form.Field
          name="duracionMinutos"
          validators={{
            onChange: ({ value }) => {
              return isNaN(value) || value <= 0
                ? "La duración debe ser un número positivo"
                : undefined;
            },
          }}
        >
          {(field) => (
            <TextField
              label="Duración (minutos)"
              variant="outlined"
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors.length > 0}
              helperText={field.state.meta.errors.join(", ") || " "}
            />
          )}
        </form.Field>

        {/** Categoría */}
        <form.Field
          name="categoria"
          validators={{
            onChange: ({ value }) =>
              value.trim() === "" ? "La categoría es requerida" : undefined,
          }}
        >
          {(field) => (
            <TextField
              label="Categoría"
              variant="outlined"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors.length > 0}
              helperText={field.state.meta.errors.join(", ") || " "}
            />
          )}
        </form.Field>

        <FormGroup>
          <Button type="submit" variant="contained">
            Crear Servicio
          </Button>
        </FormGroup>
      </Stack>
    </form>
  );
};
