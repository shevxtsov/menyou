import {
    Body,
    Controller,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'

import { OrderService } from './order.service'
import { TransformBodyForDtoPipe } from 'src/shared/pipes/transformBodyForDto.pipe'
import { User } from 'src/user/decorators/user.decorator'
import { MasterGuard } from 'src/shared/guards/master.guard'
import { UserEntity } from 'src/user/user.entity'
import { CreateOrderDto } from './dto/createOrder.dto'

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
}
