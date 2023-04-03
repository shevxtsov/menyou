import { Injectable } from '@nestjs/common'

@Injectable()
export class OrderService {
    public createOrder() {
        return 'create order'
    }
}
