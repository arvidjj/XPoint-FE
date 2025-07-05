import { Container, Stack, Typography } from "@mui/material";
import { CreateServicio } from "../../../features/servicios/components/crear-servicio";
import type { CreateServicioRequest } from "../../../features/servicios/create-servicio";
import { useCreateServicio } from "../../../features/servicios/create-servicio";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useServicioExists } from "../../../features/servicios/servicio-exists";


const InitServicio = () => {
    const navigate = useNavigate();
    const createServicioMutation = useCreateServicio();

    const handleSubmit = async (data: CreateServicioRequest) => {
        console.log("handleSubmit called with data:", data);
        try {
            console.log("Attempting to create service...");
            await createServicioMutation.mutateAsync(data);
            console.log("Service created successfully, navigating to dashboard");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error creating service:", error);
        }
    }

    const { data: servicioExists, isLoading } = useServicioExists();

    useEffect(() => {
        if (!isLoading && servicioExists?.exists) {
            navigate("/dashboard");
        }
    }, [servicioExists, isLoading]);

    return (
        <>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    No se ha detectado ningún servicio inicial, para usar la aplicación, debes crear uno.
                </Typography>


                <Stack spacing={2} justifyContent="center">
                    <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                        Crea el servicio por defecto
                    </Typography>

                    <CreateServicio disabled={isLoading} onSubmit={handleSubmit} />
                </Stack>
            </Container>
        </>
    )
}

export default InitServicio;