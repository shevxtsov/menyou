import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'roles' })
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    name: string
}
