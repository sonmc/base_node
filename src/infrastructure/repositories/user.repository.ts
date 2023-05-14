import { BaseRepository } from './base.repositoy';
import { User } from 'infrastructure/schemas/user.schema';
import { getManager } from 'typeorm';

export class UserRepository extends BaseRepository<User> {
    entityManager: any;
    constructor() {
        const em = getManager().getRepository(User);
        super(em);
        this.entityManager = em;
    }

    async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
        await this.entityManager.update(
            {
                username: username,
            },
            { hash_refresh_token: refreshToken }
        );
    }

    async updateLastLogin(username: string): Promise<void> {
        await this.entityManager.update(
            {
                username: username,
            },
            { last_login: () => 'CURRENT_TIMESTAMP' }
        );
    }

    async getUserByUsername(username: string) {
        const user = await this.entityManager.findOne({
            where: {
                username: username,
            },
            relations: ['roles', 'roles.permissions'],
        });
        return user;
    }
}
