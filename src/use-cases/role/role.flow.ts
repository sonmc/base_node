import { GroupService } from 'service/group.service';

export class RoleFlow {
    private groupService: GroupService;
    constructor(_groupService: GroupService) {
        this.groupService = _groupService;
    }
    async getAll() {
        const result = await this.groupService.getAll();
        return result;
    }
}

export default RoleFlow;
