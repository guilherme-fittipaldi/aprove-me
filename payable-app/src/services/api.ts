import axios from 'axios';
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: 'http://localhost:3000/integrations', // URL da sua API
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  console.log("veja", token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Refresh token
        const refreshToken = Cookies.get("refreshToken");
        const response = await axios.post("http://localhost:3000/integrations/auth/refresh", {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Atualiza os cookies
        Cookies.set("accessToken", accessToken, { expires: 1 / 1440 });
        Cookies.set("refreshToken", newRefreshToken, { expires: 1 });

        // Reenvia a requisição original
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login"; // Redireciona para o login
      }
    }
    return Promise.reject(error);
  }
);

export default api;
