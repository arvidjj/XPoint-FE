import { Stack, Typography } from "@mui/material";
import { CreateServicio } from "../../../features/servicios/components/crear-servicio";


const Servicios = () => {

    return (
        <Stack>
            <Typography variant="h4" gutterBottom>
                Servicios
            </Typography>
            <CreateServicio>

            </CreateServicio>
        </Stack>
    );
}

export default Servicios;