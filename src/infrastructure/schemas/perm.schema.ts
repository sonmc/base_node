import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Role } from './role.schema';
import { BaseSchema } from './base.schema';

@Entity({ name: 'permissions' })
export class Permission extends BaseSchema {
    @Column()
    name: string = '';

    @Column()
    label: string = '';

    @ManyToMany(() => Role, (role) => role.permissions)
    @JoinTable({
        name: 'roles_pems',
        joinColumn: { name: 'permission_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    })
    roles: Role[] | undefined;
}
