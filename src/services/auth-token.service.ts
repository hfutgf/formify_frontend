import Cookies from "js-cookie";
import { queryConfig } from "@/config/query.config";
import axios from "axios";

export class AuthTokenService {
  ACCESS_TOKEN = "accessToken";
  REFRESH_TOKEN = "refreshToken";

  getAccessToken = async () => {
    let accessToken = Cookies.get(this.ACCESS_TOKEN);
    const refreshToken = Cookies.get(this.REFRESH_TOKEN);
    if (!accessToken) {
      if (refreshToken) {
        const response = await axios.post<{
          accessToken: string;
        }>(import.meta.env.VITE_BASE_URL + queryConfig.GET_ACCESS_TOKEN, {
          refreshToken,
        });
        accessToken = response.data.accessToken;
        Cookies.set(this.ACCESS_TOKEN, accessToken, {
          expires: 1,
        });
      }
    }
    return accessToken ? accessToken : null;
  };
}
