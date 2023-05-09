import { BaseSchema } from 'infrastructure/schemas/base.schema';
import { Column, Entity, OneToMany, ManyToMany, JoinTable, Index } from 'typeorm';

@Entity({ name: 'roles' })
export class Role extends BaseSchema {
    @Column()
    label: string = '';

    @Column()
    value: string = '';

    @Column({ nullable: true })
    description: string = '';
}
