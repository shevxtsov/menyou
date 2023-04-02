import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'filters' })
export class FilterEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
