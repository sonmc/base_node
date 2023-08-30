import { IPerm } from "services/core/perm.service";
import { IUser } from "services/core/user.service";
 

export class CheckPermissionFlow {
  private userService: IUser;
  private permService: IPerm;
  constructor(_userService: IUser, _permService: IPerm) {
    this.userService = _userService;
    this.permService = _permService;
  }
  async verifyPermission(username: string, action: string) {
    const user = await this.userService.getByName(username);
    const perm = await this.permService.getByAction(action);
    return user;
  }
}

export default CheckPermissionFlow;
