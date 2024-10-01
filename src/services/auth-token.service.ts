import Cookies from "js-cookie";

export class AuthTokenService {
  ACCESS_TOKEN = "accessToken";

  getAccessToken = async () => {
    const accessToken = Cookies.get(this.ACCESS_TOKEN);
    return accessToken;
  };
}
