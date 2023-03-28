import { Controller, Post } from '@nestjs/common'

import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
    constructor(private readonly _productService: ProductService) {}

    @Post()
    createProduct(): string {
        return this._productService.createProduct()
    }
}
