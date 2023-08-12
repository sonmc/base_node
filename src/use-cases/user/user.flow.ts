
import { IUser } from '../../services/user.service';
import { getUserNameByToken } from '../../utils/bcrypt.util'; 

export class UserFlow {
    private userService: IUser; 
    constructor(_userService: IUser) {
        this.userService = _userService;
    }
    async getCurrentUser(access_token: string) {
        const username = getUserNameByToken(access_token);
        const user = await this.userService.getByName(username);
        return user;
    }

    async create(user: any, access_token: string) {
        const username = getUserNameByToken(access_token);
        const result = await this.userService.getByName(username);
        user.workspace = result.workspace;
        return await this.userService.create(user);
    }

    async list(param: any) {
        const username = getUserNameByToken(param.access_token);
        const result = await this.userService.getByName(username); 
        return this.userService.list();
    }
}

export default UserFlow;
