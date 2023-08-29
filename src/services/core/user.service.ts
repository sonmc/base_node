import { UserSchema } from "../../services/schemas/core/user.schema";
import { BaseService, IBaseService } from "../base.service";
import { hash } from "../../utils/bcrypt.util";
import { Repository } from "typeorm";

export interface IUser extends IBaseService<UserSchema> {
  getByName(username: string): Promise<any>;
  updateLoginTime(username: string): any;
  setRefreshToken(refreshToken: string, username: string): any;
}

export class UserService extends BaseService<UserSchema> {
  constructor(private readonly userRepo: Repository<UserSchema>) {
    super(userRepo);
  }

  async getByName(username: string) {
    const user = (await this.userRepo.findOne({
      where: { username: username },
    })) as UserSchema;
    return { status: "success", result: user };
  }

  async updateLoginTime(username: string) {
    await this.userRepo.update(
      {
        username: username,
      },
      { last_login: () => "CURRENT_TIMESTAMP" }
    );
  }

  async setRefreshToken(refreshToken: string, username: string) {
    const hashedRefreshToken = await hash(refreshToken);
    await this.userRepo.update(
      {
        username: username,
      },
      { hash_refresh_token: hashedRefreshToken }
    );
  }

  async updateRefreshToken(
    username: string,
    refreshToken: string
  ): Promise<void> {
    await this.userRepo.update(
      {
        username: username,
      },
      { hash_refresh_token: refreshToken }
    );
  }
}
