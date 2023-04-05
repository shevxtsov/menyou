import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { DeleteResult } from 'typeorm'

import { OrderService } from './order.service'
import { TransformBodyForDtoPipe } from 'src/shared/pipes/transformBodyForDto.pipe'
import { User } from 'src/user/decorators/user.decorator'
import { MasterGuard } from 'src/shared/guards/master.guard'
import { UserEntity } from 'src/user/user.entity'
import { CreateOrderDto } from './dto/createOrder.dto'
import { IQueryForList } from 'src/shared/types/queryForList.interface'
import { IOrderListResponse } from './types/orderListResponse.interface'
import { IOrderResponse } from './types/orderResponse.interface'
import { IQueryGetSingle } from '../shared/types/queryGetSingle.interface'

@Controller('order')
@UseGuards(MasterGuard)
export class OrderController {
    constructor(private readonly _orderService: OrderService) {}

    @Post()
    @UsePipes(new ValidationPipe(), new TransformBodyForDtoPipe())
    async createOrder(
        @User('id') currentUser: UserEntity,
        @Body('order') createOrderDto: CreateOrderDto
    ) {
        const order = await this._orderService.createOrder(
            currentUser,
            createOrderDto
        )

        return this._orderService.buildOrderResponse(order)
    }

    @Delete(':id')
    async deleteOrder(@Param('id') orderId: number): Promise<DeleteResult> {
        return await this._orderService.deleteOrder(orderId)
    }

    @Get()
    async findOne(@Query() query: IQueryGetSingle): Promise<IOrderResponse> {
        const order = await this._orderService.findFullOrderById(query.id)

        return this._orderService.buildOrderResponse(order)
    }

    @Get('list')
    async findAll(@Query() query: IQueryForList): Promise<IOrderListResponse> {
        return await this._orderService.findAll(query)
    }
}
