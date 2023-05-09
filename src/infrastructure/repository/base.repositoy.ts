import { Repository, DeepPartial, ObjectLiteral } from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> {
    private readonly repo: Repository<T>;

    constructor(repo: Repository<T>) {
        this.repo = repo;
    }

    async getListItem(): Promise<Array<T>> {
        return await this.repo.find();
    }

    async getById(id: any): Promise<T> {
        return await this.repo.findOneOrFail(id);
    }

    async create(data: DeepPartial<T>, entityAlreadyCreated?: DeepPartial<T>): Promise<T> {
        const entity: DeepPartial<T> = entityAlreadyCreated || this.getInstance(data);
        return await this.repo.save(entity);
    }

    async update(id: number, body: any): Promise<T> {
        await this.repo.update(id, body);
        return this.getById(id);
    }

    async del(id: number): Promise<T> {
        const entity = await this.getById(id);
        await this.repo.delete(id);
        return entity;
    }

    getInstance(data: DeepPartial<T>): DeepPartial<T> {
        return this.repo.create(data);
    }
}
