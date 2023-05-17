import { Role } from 'infrastructure/schemas/role.schema';
import { getRepository } from 'typeorm';

export class RoleService {
    async getAll(): Promise<Role[]> {
        const roleRepo = getRepository(Role);
        const roles = await roleRepo.find();
        return roles;
    }
}
