import { BaseService, IBaseService } from "../../services/base.service";
import { GroupSchema } from "../../services/schemas/core/group.schema";
import { Repository } from "typeorm";

export interface IGroup extends IBaseService<GroupSchema> {}

export class GroupService extends BaseService<GroupSchema> {
  constructor(private readonly groupRepo: Repository<GroupSchema>) {
    super(groupRepo);
  }
}
