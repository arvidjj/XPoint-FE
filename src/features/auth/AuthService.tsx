import { z } from "zod";

import api from "../../api/api";
import type { AuthUser } from "./shared/AuthUser";

const RegisterRequestSchema = z.object({
    nombre: z.string(),
    email: z.string().email(),
    password: z.string().min(6) // example constraint
});
type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

async function login(request: { email: string, password: string }) {
    const response = await api.post("api/cuenta/login", request);
    return response.data as AuthUser;
}

async function register(request: RegisterRequest) {
    RegisterRequestSchema.parse(request); // throws if invalid
  
    const response = await api.post("api/cuenta/registrar", request);
    return response.data as AuthUser;
  }

async function whoami(token: string) {

    const response = await api.post("api/cuenta/whoami", { token })
    if (response.data) return { ...response.data, token } as AuthUser;
    return undefined;
}

async function setPassword(newPassword: string) {
    await api.put("api/cuenta/password", { newPassword });
}

const AuthService = {
    login,
    register,
    whoami,
    setPassword
};

export default AuthService;