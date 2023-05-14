import { UserRepository } from 'infrastructure/repository/user.repository';
import { compare, hash } from 'utils/bcrypt.util'; 

export class AuthService {
    userRepo: UserRepository;
    constructor() {
        this.userRepo = new UserRepository();
    }
    async login(username: string, password: string) {
        const user = await this.userRepo.getUserByUsername(username);
        const isMatched = await compare(password, user.password);
        if (user && isMatched) {
            await this.updateLoginTime(user.username);
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async updateLoginTime(username: string) {
        await this.userRepo.updateLastLogin(username);
    }

    async setRefreshToken(refreshToken: string, username: string) {
        const currentHashedRefreshToken = await hash(refreshToken);
        await this.userRepo.updateRefreshToken(username, currentHashedRefreshToken);
    }
}
