import axios, { CreateAxiosDefaults } from "axios";
import { AuthTokenService } from "./auth-token.service";

export class Common {
  authTokenService: AuthTokenService = new AuthTokenService();
  constructor() {}

  private options: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  public axiosWithOutAuth = axios.create(this.options);
  public axiosWithAuth = axios
    .create(this.options)
    .interceptors.request.use((config) => {
      const authToken = this.authTokenService.getAccessToken();
      if (authToken && config.headers) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    });
}
