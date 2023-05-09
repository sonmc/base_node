import { UserRepository } from 'infrastructure/repository/user.repository';
import { Service } from 'typedi';

export class AuthService {
    userRepo: UserRepository;
    constructor() {
        this.userRepo = new UserRepository();
    }
    async login(): Promise<any> {
        const users = await this.userRepo.getListItem();
        return users;
    }
}
