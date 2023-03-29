import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'meals' })
export class MealEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: '' })
    description: string

    @Column({ default: '' })
    image: string

    @Column({ default: false })
    is_blocked: boolean
}
