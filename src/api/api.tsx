import axios from "axios";

const api = axios.create({
    baseURL:import.meta.env.VITE_APP_API_URL,
    headers:{
        "Content-Type":"application/json; charset=utf8"
    },
})

export default api;