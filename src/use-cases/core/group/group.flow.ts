import { GroupService } from "../../../services/core/group.service";

export class GroupFlow {
  private groupService: GroupService;
  constructor(_groupService: GroupService) {
    this.groupService = _groupService;
  }
  async getAll() {
    const result = await this.groupService.findAll();
    return result;
  }
}

export default GroupFlow;
