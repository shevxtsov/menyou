import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn
} from 'typeorm'

import { ProductEntity } from 'src/product/product.entity'
import { FilterEntity } from 'src/filter/filter.entity'

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

    @ManyToMany(() => ProductEntity)
    @JoinTable()
    product_list: ProductEntity[]

    @ManyToMany(() => FilterEntity)
    @JoinTable()
    filter_list: FilterEntity[]
}
