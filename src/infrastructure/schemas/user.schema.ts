import { Column, Entity, OneToMany, ManyToMany, JoinTable, Index, BeforeInsert } from 'typeorm';
import { Role } from './role.schema';
import { BaseSchema } from './base.schema';
import { hash } from 'services/bcrypt.service';

@Entity({ name: 'users' })
export class User extends BaseSchema {
    @Column()
    @Index({ unique: true })
    username: string = '';

    @Column({ nullable: true })
    first_name: string = '';

    @Column({ nullable: true })
    last_name: string = '';

    @Column({ nullable: true })
    nick_name: string = '';

    @Column({ nullable: true })
    email: string = '';

    @Column({ nullable: true })
    phone_number: string = '';

    @Column()
    password: string = '';

    @Column()
    status: number = 0;

    @Column()
    gender: boolean = false;

    @Column({ nullable: true })
    avatar: string = '';

    @Column()
    dob: Date = new Date();

    @Column()
    address: string = '';

    @Column({ nullable: true })
    introduce: string = '';

    @Column({ nullable: true })
    last_login?: Date;

    @Column({ nullable: true })
    hash_refresh_token: string = '';

    @Column()
    onboarding: Date = new Date();

    @Column()
    status_level: string = '';

    @Column({ nullable: true })
    chapterHead: number = 0;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
        name: 'users_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    })
    roles: Role[] | undefined;

    @BeforeInsert()
    async setPassword(password: string) {
        this.password = await hash(password || this.password);
    }
}
