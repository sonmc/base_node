import {
  Repository,
  DeepPartial,
  EntityRepository,
  ObjectLiteral,
} from "typeorm";

export interface IBaseService<T> {
  findAll(): Promise<any>;
  create(entity: T): Promise<any>;
  update(entity: T): Promise<any>;
  findOne(id: number): Promise<any>;
  deletes(ids: number[]): Promise<any>;
}

@EntityRepository()
export abstract class BaseService<TEntity extends ObjectLiteral>
  implements IBaseService<TEntity>
{
  constructor(private readonly repository: Repository<TEntity>) {}

  async create(entity: TEntity): Promise<any> {
    const result = await this.repository.save(entity as DeepPartial<TEntity>);
    return { status: "success", result };
  }

  async findAll(): Promise<any> {
    const result = await this.repository.createQueryBuilder();
    return { status: "success", result };
  }

  async update(entity: TEntity): Promise<any> {
    const result = await this.repository.save(entity as DeepPartial<TEntity>);
    return { status: "success", result };
  }

  async findOne(id: number): Promise<any> {
    const result = await this.repository.findOne(id);
    return { status: "success", result };
  }

  async deletes(ids: number[]): Promise<any> {
    const result = await this.repository.delete(ids);
    return { status: "success", result };
  }
}
