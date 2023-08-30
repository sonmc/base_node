import { BaseService, IBaseService } from "services/base.service";
import { PermSchema } from "services/schemas/core/perm.schema";
import { Repository } from "typeorm";

export interface IPerm extends IBaseService<PermSchema> {
  getByAction(action: string): Promise<any>;
}

export class PermService extends BaseService<PermSchema> {
  constructor(private readonly permRepo: Repository<PermSchema>) {
    super(permRepo);
  }
  async getByAction(action: string): Promise<any> {
    const perm = (await this.permRepo.findOne({
      where: { action: action },
    })) as PermSchema;
    return { status: "success", result: perm };
  }
}
