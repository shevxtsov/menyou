import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'

import { TOrderStatus } from './types/orderStatus.type'
import { UserEntity } from 'src/user/user.entity'
import { MealEntity } from 'src/meal/meal.entity'

@Entity({ name: 'orders' })
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: 'CREATED' })
    status: TOrderStatus

    @Column({ default: true })
    is_active: boolean

    @Column()
    cooking_time: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    end_time: Date

    @ManyToOne(() => UserEntity, (user) => user.order_list, { eager: true })
    author: UserEntity

    @ManyToMany(() => MealEntity)
    @JoinTable()
    meal_list: MealEntity[]
}
