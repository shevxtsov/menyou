import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { OrderEntity } from './order.entity'
import { MealEntity } from 'src/meal/meal.entity'
import { OrderStatusService } from './services/orderStatus.service'
import { OrderSocketGateway } from './services/order.gateway'

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, MealEntity])],
    controllers: [OrderController],
    providers: [OrderSocketGateway, OrderService, OrderStatusService]
})
export class OrderModule {}
