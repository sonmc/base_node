import { UserSchema } from 'schema/user.schema';
import { AuthService } from 'service/auth.service';
import { UserService } from 'service/user.service';
import { compare, generateAccessToken, generateRefreshToken } from 'utils/bcrypt.util';

export class LoginFlow {
    private authService: AuthService;
    private userService: UserService;
    constructor(_authService: AuthService, _userService: UserService) {
        this.authService = _authService;
        this.userService = _userService;
    }
    async login(username: string, password: string) {
        const { status, result } = await this.userService.getUserByName(username);
        if (status === 'error' || !result) {
            return { status, result: {} };
        }
        const user = result as UserSchema;
        const isMatched = await compare(password, user.password);
        if (!isMatched) {
            return { status, result: {} };
        }

        const payload = { id: user.id, username: user.username };
        const accessToken = await generateAccessToken(payload);
        const refreshToken = await generateRefreshToken(payload);
        await this.authService.updateLoginTime(user.username);
        await this.authService.setRefreshToken(refreshToken, username);
        return { status: 'success', result: { accessToken, refreshToken } };
    }
}

export default LoginFlow;
