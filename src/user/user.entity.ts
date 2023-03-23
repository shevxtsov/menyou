import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { hash } from 'bcrypt'

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

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await hash(this.password, 10)
    }
}
