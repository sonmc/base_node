import { generateToken } from 'services/bcrypt.service';
import { UserService } from 'services/user/user.service';

export class RefreshTokenFlow {
    private userService: UserService;
    constructor(_userService: UserService) {
        this.userService = _userService;
    }
    async refreshToken(refresh_token: string) {
        const user = await this.userService.getUser(refresh_token);
        const payload = { username: user.username };
        const secretKey = process.env.JWT_SECRET || '';
        const expiresIn = process.env.JWT_EXPIRATION_TIME + 's';
        const accessToken = await generateToken(payload, secretKey, expiresIn);
        return accessToken;
    }
}

export default RefreshTokenFlow;
