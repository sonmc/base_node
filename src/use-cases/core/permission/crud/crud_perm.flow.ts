import { IPerm } from "services/core/perm.service"; 

export class CrudPermFlow {
  private permService: IPerm;
  constructor(_permService: IPerm) {
    this.permService = _permService;
  }
 
  async create(user: any) {
    return await this.permService.create(user);
  }

  async list() {
    return this.permService.findAll();
  }

  async delete(ids: number[]) {
    return await this.permService.deletes(ids);
  }
}

export default CrudPermFlow;
