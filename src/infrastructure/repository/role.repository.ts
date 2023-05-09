import { Service } from 'typedi';
import { getManager } from 'typeorm';
import { BaseRepository } from './base.repositoy';
import { Role } from '../schemas/role.schema';
@Service()
export class RoleRepository extends BaseRepository<Role> {
    constructor() {
        const entityManager = getManager().getRepository(Role);
        super(entityManager);
    }
}
