import {
    BeforeInsert,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import { hash } from 'bcrypt'

import { RoleEntity } from 'src/role/role.entity'

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column({ default: false })
    is_admin: boolean

    @Column({ default: false })
    is_blocked: boolean

    @Column({ default: '' })
    image: string

    @Column({ select: false })
    password: string

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await hash(this.password, 10)
    }

    @ManyToMany(() => RoleEntity)
    @JoinTable()
    role_list: RoleEntity[]
}
