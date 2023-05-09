import { BaseRepository } from './base.repositoy';
import { User } from 'infrastructure/schemas/user.schema';
import { getManager } from 'typeorm';
 
export class UserRepository extends BaseRepository<User> {
    constructor() {
        const entityManager = getManager().getRepository(User);
        super(entityManager);
    }
}
