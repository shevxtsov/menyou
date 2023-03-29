import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'

import { MasterGuard } from 'src/shared/guards/master.guard'
import { TransformBodyForDtoPipe } from 'src/shared/pipes/transformBodyForDto.pipe'
import { DeleteResult } from 'typeorm'
import { CreateProductDto } from './dto/createProduct.dto'
import { UpdateProductDto } from './dto/updateProduct.dto'
import { ProductService } from './product.service'
import { IProductListResponse } from './types/productListResponse.interface'
import { IProductResponse } from './types/productResponse.interface'

@Controller('product')
@UseGuards(MasterGuard)
export class ProductController {
    constructor(private readonly _productService: ProductService) {}

    @Post()
    @UsePipes(new ValidationPipe(), new TransformBodyForDtoPipe())
    async createProduct(
        @Body('product') createProductDto: CreateProductDto
    ): Promise<IProductResponse> {
        const product = await this._productService.createProduct(
            createProductDto
        )

        return this._productService.buildProductResponse(product)
    }

    @Put(':id')
    @UsePipes(new ValidationPipe(), new TransformBodyForDtoPipe())
    async updateProduct(
        @Param('id') productId: number,
        @Body('product') updateProductDto: UpdateProductDto
    ): Promise<IProductResponse> {
        const product = await this._productService.updateProduct(
            productId,
            updateProductDto
        )

        return this._productService.buildProductResponse(product)
    }

    @Delete(':id')
    async deleteProduct(@Param('id') productId: number): Promise<DeleteResult> {
        return await this._productService.deleteProduct(productId)
    }

    @Get('list')
    async findAll(@Query() query: any): Promise<IProductListResponse> {
        return await this._productService.findAll(query)
    }
}
