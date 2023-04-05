import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, In, Repository } from 'typeorm'

import { UserEntity } from 'src/user/user.entity'
import { CreateOrderDto } from './dto/createOrder.dto'
import { OrderEntity } from './order.entity'
import { MealEntity } from 'src/meal/meal.entity'
import { IOrderResponse } from './types/orderResponse.interface'
import { IOrderListResponse } from './types/orderListResponse.interface'
import { IQueryForList } from 'src/shared/types/queryForList.interface'

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

    public async deleteOrder(orderId: number): Promise<DeleteResult> {
        const order = await this.findOrderById(orderId)

        if (!order) {
            throw new HttpException('order doesnt exist', HttpStatus.NOT_FOUND)
        }

        return await this._orderRepository.delete(orderId)
    }

    public async findAll(query: IQueryForList): Promise<IOrderListResponse> {
        const queryBuilder = this._orderRepository
            .createQueryBuilder('orders')
            .leftJoinAndSelect('orders.author', 'users')
        const ordersCount = await queryBuilder.getCount()

        if (query.limit) {
            queryBuilder.limit(query.limit)
        }

        if (query.offset) {
            queryBuilder.offset(query.offset)
        }

        const orders = await queryBuilder.getMany()

        return {
            orders: orders,
            total: ordersCount
        }
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

    public async findOrderById(orderId: number): Promise<OrderEntity> {
        return await this._orderRepository.findOne({
            where: {
                id: orderId
            }
        })
    }

    public async findFullOrderById(orderId: number): Promise<OrderEntity> {
        const order = await this._orderRepository
            .createQueryBuilder('orders')
            .leftJoinAndSelect('orders.meal_list', 'meals')
            .where('orders.id = :id', {
                id: orderId
            })
            .getOne()

        if (!order) {
            throw new HttpException('order doesnt exist', HttpStatus.NOT_FOUND)
        }

        return order
    }

    public buildOrderResponse(order: OrderEntity): IOrderResponse {
        return {
            order
        }
    }
}
