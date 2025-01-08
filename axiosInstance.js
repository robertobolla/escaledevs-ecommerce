import axios from "axios";
import { useAuth } from "@clerk/nextjs";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL base de tu API Strapi
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { getToken } = useAuth();

    try {
      // Solicita explícitamente un JWT con el template configurado
      const token = await getToken({ template: "jwt" });

      if (token) {
        console.log("Token obtenido desde Clerk:", token); // Log para verificar el token
        config.headers.Authorization = `Bearer ${token}`; // Incluye el token en el encabezado Authorization
      } else {
        console.error("Token JWT no disponible");
      }
    } catch (error) {
      console.error("Error al obtener el token JWT:", error.message); // Más detalle sobre el error
    }

    return config;
  },
  (error) => {
    console.error("Error en la configuración de la solicitud:", error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
