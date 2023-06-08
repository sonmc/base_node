import { User } from 'infrastructure/schemas/user.schema';
import { getRepository } from 'typeorm';
import { getUserNameByToken } from 'utils/bcrypt.util';

export interface IUser {
    list(): any;
    getUser(token: string): any;
    getUserByName(name: string): any;
}
export class UserService implements IUser {
    async list() {
        const userRepo = getRepository(User);
        const users = await userRepo.find();
        return { status: 'success', result: users };
    }

    async getUser(refresh_token: string) {
        const userRepo = getRepository(User);
        const username = getUserNameByToken(refresh_token);
        const user = await userRepo.findOne({
            where: {
                username: username,
            },
            relations: ['roles', 'roles.permissions'],
        });
        return { status: 'success', result: user || new User() };
    }

    async getUserByName(username: string) {
        const userRepo = getRepository(User);
        const user = await userRepo.findOne({
            where: {
                username: username,
            },
            relations: ['roles', 'roles.permissions'],
        });
        return { status: 'success', result: user };
    }
}
