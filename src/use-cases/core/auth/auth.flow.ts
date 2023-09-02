import { IUser } from "../../../services/core/user.service";
import {
  compare,
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/core/bcrypt.util";

export class AuthFlow {
  private userService: IUser;
  constructor(_userService: IUser) {
    this.userService = _userService;
  }

  async login(username: string, password: string) {
    const { status, result } = await this.userService.getByName(username);
    const user = result;
    if (status == "error") {
      return { status: "error", result: {} };
    }

    const isMatched = await compare(password, user.password);
    if (!isMatched) {
      return { status: "error", result: {} };
    }

    const payload = { id: user.id, username: user.username };
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);
    await this.userService.updateLoginTime(user.username);
    await this.userService.setRefreshToken(refreshToken, username);
    return { status: "success", result: { accessToken, refreshToken } };
  }

  async refreshToken(refresh_token: string) {
    const { status, result } = await this.userService.getByName(refresh_token);
    const user = result;
    const isRefreshTokenMatching = await compare(
      refresh_token,
      user.hash_refresh_token
    );
    if (isRefreshTokenMatching) {
      return { status: "error", result: null };
    }

    const payload = { username: user.username };
    const accessToken = await generateAccessToken(payload);
    return { status: "success", result: accessToken };
  }
}

export default AuthFlow;
