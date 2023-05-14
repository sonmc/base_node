import { AuthService } from 'services/auth/auth.service';
import { generateToken } from 'utils/bcrypt.util';

export class LoginFlow {
    private authService: AuthService;
    constructor(_authService: AuthService) {
        this.authService = _authService;
    }
    async login(username: string, password: string) {
        const user = await this.authService.login(username, password);
        const payload = { id: user.id, username: user.username };
        const accessToken = await generateToken(payload);
        const refreshToken = await generateToken(payload);
        await this.authService.setRefreshToken(refreshToken, username);
        return { accessToken, refreshToken };
    }
}

export default LoginFlow;
