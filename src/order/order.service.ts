import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { UserEntity } from 'src/user/user.entity'
import { CreateOrderDto } from './dto/createOrder.dto'
import { OrderEntity } from './order.entity'
import { In, Repository } from 'typeorm'
import { MealEntity } from 'src/meal/meal.entity'
import { IOrderResponse } from './types/orderResponse.interface'

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly _orderRepository: Repository<OrderEntity>,
        @InjectRepository(MealEntity)
        private readonly _mealRepository: Repository<MealEntity>
    ) {}

    public async createOrder(
        currentUser: UserEntity,
        createOrderDto: CreateOrderDto
    ): Promise<OrderEntity> {
        const order = await this._orderRepository.findOne({
            where: {
                name: createOrderDto.name
            }
        })

        if (order) {
            throw new HttpException(
                'order already exist',
                HttpStatus.UNPROCESSABLE_ENTITY
            )
        }

        const newOrder = new OrderEntity()
        const meals = await this.getMealsByIds(createOrderDto.meal_list)

        Object.assign(newOrder, createOrderDto)
        newOrder.author = currentUser
        newOrder.meal_list = meals

        return await this._orderRepository.save(newOrder)
    }

    public async getMealsByIds(meals: number[]): Promise<MealEntity[]> {
        const returnedMeals = await this._mealRepository.find({
            where: {
                id: In(meals)
            }
        })

        if (returnedMeals.length !== meals.length) {
            throw new HttpException(
                'Some of the meals you supplied were not found',
                HttpStatus.NOT_FOUND
            )
        }

        return returnedMeals
    }

    public buildOrderResponse(order: OrderEntity): IOrderResponse {
        return {
            order
        }
    }
}
