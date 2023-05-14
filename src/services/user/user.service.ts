import { UserRepository } from 'infrastructure/repository/user.repository';
import { UserEntity } from './entity/user.entity';
import { plainToInstance } from 'class-transformer';
import { compare, getUserByToken } from 'utils/bcrypt.util';

export class UserService {
    userRepo: UserRepository;
    constructor() {
        this.userRepo = new UserRepository();
    }
    async getAll(): Promise<UserEntity[]> {
        const users = await this.userRepo.getListItem();
        return users.map((user) => plainToInstance(UserEntity, user));
    }
    async getUser(refresh_token: string) {
        const username = getUserByToken(refresh_token);
        console.log('user', username);

        const user = await this.userRepo.getUserByUsername(username);

        const isRefreshTokenMatching = await compare(refresh_token, user.hash_refresh_token);
        if (isRefreshTokenMatching) {
            return user;
        }
        return null;
    }
}
