import { OrderEntity } from '../order.entity'

export interface IOrderListResponse {
    orders: OrderEntity[]
    total: number
}
