import { AuthService } from 'services/auth/auth.service';

export class LoginFlow {
    private authService: AuthService;
    constructor(_authService: AuthService) {
        this.authService = _authService;
    }
    async login() {
        const result = await this.authService.login();
        return result;
    }
}

export default LoginFlow;
