import { AuthService } from 'services/auth/auth.service';
import { generateToken } from 'services/bcrypt.service';

export class LoginFlow {
    private authService: AuthService;
    constructor(_authService: AuthService) {
        this.authService = _authService;
    }
    async login(username: string, password: string) {
        const user = await this.authService.login(username, password);

        const payload = { id: user.id, username: user.username };
        const secretKey = process.env.JWT_SECRET || '';
        const expiresIn = process.env.JWT_EXPIRATION_TIME + 's';
        const accessToken = await generateToken(payload, secretKey, expiresIn);

        const secretKeyRefreshToken = process.env.JWT_REFRESH_TOKEN_SECRET || '';
        const expiresInForRefreshToken = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME + 's';
        const refreshToken = await generateToken(payload, secretKeyRefreshToken, expiresInForRefreshToken);
        await this.authService.setRefreshToken(refreshToken, username);
        return { accessToken, refreshToken };
    }
}

export default LoginFlow;
