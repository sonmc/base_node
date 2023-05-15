import { UserService } from 'services/user/user.service';
import { getUserNameByToken } from 'utils/bcrypt.util';

export class UserFlow {
    private userService: UserService;
    constructor(_userService: UserService) {
        this.userService = _userService;
    }
    async getCurrentUser(acccess_token: string) {
        const username = getUserNameByToken(acccess_token);
        const { status, result } = await this.userService.getUserByName(username);
        return { status, result };
    }

    async getAllUser() {
        return await this.userService.getAll();
    }
}

export default UserFlow;
