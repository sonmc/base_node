import { UserRepository } from 'infrastructure/repositories/user.repository';
import { getUserNameByToken } from 'utils/bcrypt.util';

export class UserService {
    userRepo: UserRepository;
    constructor() {
        this.userRepo = new UserRepository();
    }
    async getAll() {
        const users = await this.userRepo.getListItem();
        return { status: 'success', result: users };
    }

    async getUser(refresh_token: string) {
        const username = getUserNameByToken(refresh_token);
        const user = await this.userRepo.getUserByName(username);
        return { status: 'success', result: user };
    }

    async getUserByName(username: string) {
        const user = await this.userRepo.getUserByName(username);
        return { status: 'success', result: user };
    }
}
