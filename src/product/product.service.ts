import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductService {
    public createProduct() {
        return 'create product'
    }
}
