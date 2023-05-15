import { UserRepository } from 'infrastructure/repositories/user.repository';
import { compare, hash } from 'utils/bcrypt.util';

export class AuthService {
    userRepo: UserRepository;
    constructor() {
        this.userRepo = new UserRepository();
    }

    async updateLoginTime(username: string) {
        await this.userRepo.updateLastLogin(username);
    }

    async setRefreshToken(refreshToken: string, username: string) {
        const currentHashedRefreshToken = await hash(refreshToken);
        await this.userRepo.updateRefreshToken(username, currentHashedRefreshToken);
    }
}
