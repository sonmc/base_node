import { IPerm } from '../../../../services/core/perm.service';

export class CrudPermFlow {
  private permService: IPerm;
  constructor(_permService: IPerm) {
    this.permService = _permService;
  }

  async list() {
    return this.permService.findAll();
  }
}

export default CrudPermFlow;
