import { generateToken } from 'utils/bcrypt.util';
import { UserService } from 'services/user/user.service';

export class RefreshTokenFlow {
    private userService: UserService;
    constructor(_userService: UserService) {
        this.userService = _userService;
    }
    async refreshToken(refresh_token: string) {
        const user = await this.userService.getUser(refresh_token);
        const payload = { username: user.username };
        const accessToken = await generateToken(payload);
        return accessToken;
    }
}

export default RefreshTokenFlow;
