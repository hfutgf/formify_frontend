import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { AuthTokenService } from "./auth-token.service";

export class Common {
  authTokenService: AuthTokenService = new AuthTokenService();
  constructor() {
    this.axiosWithAuth.interceptors.request.use(async (config) => {
      const authToken = await this.authTokenService.getAccessToken();
      if (authToken && config.headers) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    });
  }

  private options: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  axiosWithOutAuth: AxiosInstance = axios.create(this.options);

  axiosWithAuth: AxiosInstance = axios.create(this.options);
}
