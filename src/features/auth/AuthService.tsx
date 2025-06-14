import api from "../../api/api";

type LoginResponse = {id:string, nombre:string, email:string, token:string, isTemporal:boolean};

async function login(request:{email:string, password:string}){
    const response = await api.post("api/cuenta/login", request);
    return response.data as LoginResponse;
}

async function whoami(token:string){
    
    const response = await api.post("api/cuenta/whoami", { token })
    if(response.data) return { ...response.data, token } as LoginResponse;
    return undefined;
}

async function setPassword(newPassword:string){
    await api.put("api/cuenta/password", { newPassword });
}

const AuthService = {
    login,
    whoami,
    setPassword
};

export default AuthService;