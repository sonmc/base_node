import { BaseSchema } from 'infrastructure/schemas/base.schema';
import { BeforeInsert, Column, Entity, OneToMany, ManyToMany, JoinTable, Index } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseSchema {
    @Column()
    @Index({ unique: true })
    username: string = '';

    @Column()
    email: string = '';

    @Column()
    phone_number: string = '';

    @Column()
    password: string = '';

    @Column('varchar', { nullable: true })
    hash_refresh_token: string = '';
}
