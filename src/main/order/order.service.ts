import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, In, Repository } from 'typeorm'

import { UserEntity } from 'src/auth/user/user.entity'
import { CreateOrderDto } from './dto/createOrder.dto'
import { OrderEntity } from './order.entity'
import { MealEntity } from 'src/main/meal/meal.entity'
import { IOrderResponse } from './types/orderResponse.interface'
import { IOrderListResponse } from './types/orderListResponse.interface'
import { IQueryForList } from 'src/shared/types/queryForList.interface'
import { TOrderStatus } from './types/orderStatus.type'
import { OrderStatusService } from './services/orderStatus.service'

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly _orderRepository: Repository<OrderEntity>,
        @InjectRepository(MealEntity)
        private readonly _mealRepository: Repository<MealEntity>,
        private readonly _orderStatusService: OrderStatusService
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

        const savedOrder = await this._orderRepository.save(newOrder)

        if (savedOrder) {
            this._orderStatusService.setOrderTimer(savedOrder, () => {
                this.updateStatus(savedOrder.id, 'DONE')
            })
        }

        return savedOrder
    }

    public async updateStatus(
        orderId: number,
        status: TOrderStatus
    ): Promise<OrderEntity> {
        const order = await this.findOrderById(orderId)

        if (!order) {
            throw new HttpException('order doesnt exist', HttpStatus.NOT_FOUND)
        }

        order.status = status

        switch (status) {
            case 'CANCELED':
            case 'DONE':
                order.is_active = false
                break
            case 'ACCEPTED':
            case 'IN_PROCCESS':
            case 'DELAYED':
                order.is_active = true
            default:
                break
        }

        const updatedOrder = await this._orderRepository.save(order)

        if (updatedOrder) {
            this._orderStatusService.clearOrderTime(orderId)
            this._orderStatusService.onChangeOrderStatus(orderId, status)
        }

        return updatedOrder
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
            queryBuilder.take(query.limit)
        }

        if (query.offset) {
            queryBuilder.skip(query.offset)
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
