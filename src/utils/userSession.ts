import { AuthTokenService } from "@/services/auth-token.service";
import { UserService } from "@/services/user.service";
import { jwtDecode, JwtPayload } from "jwt-decode";

const authTokenService = new AuthTokenService();
const userService = new UserService();

const userSession = async () => {
  const accessToken = await authTokenService.getAccessToken();
  if (!accessToken) return null;
  const { id } = jwtDecode(accessToken) as JwtPayload & { id: number };
  if (!id) return null;
  const user = await userService.getUser(id);
  return user;
};

export default userSession;
