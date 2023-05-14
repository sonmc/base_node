import { RoleRepository } from 'infrastructure/repositories/role.repository';
import { Role } from 'infrastructure/schemas/role.schema';

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
