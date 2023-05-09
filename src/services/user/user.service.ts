import { UserRepository } from 'infrastructure/repository/user.repository';
import { Service } from 'typedi';
import { UserEntity } from './entity/user.entity';
import { plainToInstance } from 'class-transformer';

@Service()
export class UserService {
    userRepo: UserRepository;
    constructor() {
        this.userRepo = new UserRepository();
    }
    async getAll(): Promise<UserEntity[]> {
        const users = await this.userRepo.getListItem();
        return users.map((user) => plainToInstance(UserEntity, user));
    }
}
