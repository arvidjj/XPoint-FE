import { Stack, Typography } from "@mui/material";
import { CreateServicio } from "../../../features/servicios/components/crear-servicio";
import { CreateServicioMutation } from "../../../features/servicios/create-servicio";


const Servicios = () => {

    return (
        <Stack>
            <Typography variant="h4" gutterBottom>
                Servicios
            </Typography>
            <CreateServicioMutation>
                {({ mutate, isPending, isSuccess, isError }) => (
                    <>
                        <CreateServicio onSubmit={mutate} />
                        {isPending && <span>Guardando...</span>}
                        {isSuccess && <span style={{ color: "green" }}>¡Servicio creado!</span>}
                        {isError && <span style={{ color: "red" }}>Error al crear servicio</span>}
                    </>
                )}
            </CreateServicioMutation>
        </Stack>
    );
}

export default Servicios;