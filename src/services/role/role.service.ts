import { RoleRepository } from 'infrastructure/repository/role.repository';
import { Role } from 'infrastructure/schemas/role.schema';

import { Service } from 'typedi';

@Service()
export class RoleService {
    roleRepo: RoleRepository;
    constructor() {
        this.roleRepo = new RoleRepository();
    }
    async getAll(): Promise<Role[]> {
        const roles = await this.roleRepo.getListItem();
        return roles;
    }
}
