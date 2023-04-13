import { Injectable } from '@nestjs/common'
import { BehaviorSubject } from 'rxjs'

import { IOrderTimes } from '../types/orderTimes.interface'
import { OrderEntity } from '../order.entity'
import { TTimer } from '../types/timer.type'
import { IOrderStatus } from '../types/orderWithStatus.interface'
import { TOrderStatus } from '../types/orderStatus.type'

@Injectable()
export class OrderStatusService {
    private _orderTimes: IOrderTimes = {}
    public orderStatus: BehaviorSubject<IOrderStatus> =
        new BehaviorSubject<IOrderStatus>(null)

    public setOrderTimer(order: OrderEntity, handler: () => void): void {
        const orderId: number = order.id
        const duration: number = order.cooking_time * 60000

        if (orderId in this._orderTimes) {
            clearTimeout(this._orderTimes[orderId])
        }

        const timer: TTimer = setTimeout(() => {
            handler()
        }, duration)

        this._orderTimes[orderId] = timer
    }

    public onChangeOrderStatus(orderId: number, status: TOrderStatus): void {
        this.orderStatus.next({
            id: orderId,
            status
        })
    }

    public clearOrderTime(orderId: number): void {
        delete this._orderTimes[orderId]
    }
}
