import { compare, generateAccessToken } from 'utils/bcrypt.util';
import { UserService } from 'service/user.service';

export class RefreshTokenFlow {
    private userService: UserService;
    constructor(_userService: UserService) {
        this.userService = _userService;
    }
    async refreshToken(refresh_token: string) {
        const { status, result } = await this.userService.getUser(refresh_token);
        if (status === 'error') {
            return { status, result: null };
        }
        const isRefreshTokenMatching = await compare(refresh_token, result.hash_refresh_token);
        if (isRefreshTokenMatching) {
            return { status, result: null };
        }

        const payload = { username: result.username };
        const accessToken = await generateAccessToken(payload);
        return { status, result: accessToken };
    }
}

export default RefreshTokenFlow;