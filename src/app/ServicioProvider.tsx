import { type PropsWithChildren, useEffect } from "react"
import { useServicioExists } from "../features/servicios/servicio-exists";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";


const ServicioProvider = ({ children }: PropsWithChildren) => {

    const navigate = useNavigate();
    const { data: servicioExists, isLoading } = useServicioExists();

    const { user } = useAuth();

    const role = user?.role;

    useEffect(() => {
        if (role === "admin") {
            console.log("Eres admin, checkeando servicio");
            if (!isLoading && !servicioExists?.exists) {
                console.log("No existe servicio, redirigiendo a initservicio");
                navigate("/initservicio");
            }
        }
    }, [servicioExists, isLoading]);

    return <>{children}</>;
}

export default ServicioProvider;