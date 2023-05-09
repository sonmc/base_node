import { getManager } from 'typeorm';
import { BaseRepository } from './base.repositoy';
import { Role } from '../schemas/role.schema';

export class RoleRepository extends BaseRepository<Role> {
    constructor() {
        const entityManager = getManager().getRepository(Role);
        super(entityManager);
    }
}
