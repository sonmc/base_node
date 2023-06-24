import { RoleService } from 'service/role.service';

export class RoleFlow {
    private roleService: RoleService;
    constructor(_roleService: RoleService) {
        this.roleService = _roleService;
    }
    async getAll() {
        const result = await this.roleService.getAll();
        return result;
    }
}

export default RoleFlow;