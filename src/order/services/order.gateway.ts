import { Logger } from '@nestjs/common'
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { Subscription } from 'rxjs'

import { OrderStatusService } from './orderStatus.service'
import { IOrderStatus } from '../types/orderWithStatus.interface'

@WebSocketGateway({
    cors: {
        origin: '*'
    }
})
export class OrderSocketGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server

    private _logger = new Logger('OrderSocketGateway')
    private _orderStatusSubscription: Subscription

    constructor(private readonly _orderStatusService: OrderStatusService) {}

    afterInit(): void {
        this._logger.log('=== WebSocket server initialized ===')
    }

    handleConnection(client: any): void {
        this._logger.log(`Client connected ===> ${client.id}`)
        this.subscribeOrderStatus()
    }

    private subscribeOrderStatus(): void {
        this._orderStatusSubscription =
            this._orderStatusService.orderStatus.subscribe(
                (order: IOrderStatus) => {
                    if (order) {
                        this._logger.log(
                            `updateStatus order ${order.id} ===> ${order.status}`
                        )
                        this.sendMessage('update_status', {
                            orderId: order.id,
                            status: order.status
                        })
                    }
                }
            )
    }

    handleDisconnect(client: any): void {
        this._logger.log(`Client disconnected ===> ${client.id}`)
        this._orderStatusSubscription.unsubscribe()
    }

    sendMessage(event: string, body: any): void {
        this.server.emit(event, {
            data: JSON.stringify(body)
        })
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void {
        console.log('message ==> ', message)
        this.server.emit('message', message)
    }
}
