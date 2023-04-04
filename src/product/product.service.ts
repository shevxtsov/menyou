import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'

import { CreateProductDto } from './dto/createProduct.dto'
import { UpdateProductDto } from './dto/updateProduct.dto'
import { ProductEntity } from './product.entity'
import { IProductListResponse } from './types/productListResponse.interface'
import { IProductResponse } from './types/productResponse.interface'
import { IQueryForList } from 'src/shared/types/queryForList.interface'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly _productRepository: Repository<ProductEntity>
    ) {}

    public async createProduct(
        createProductDto: CreateProductDto
    ): Promise<ProductEntity> {
        const product = new ProductEntity()

        Object.assign(product, createProductDto)

        return await this._productRepository.save(product)
    }

    public async updateProduct(
        productId: number,
        updateProductDto: UpdateProductDto
    ): Promise<ProductEntity> {
        const product = await this.findProductById(productId)

        if (!product) {
            throw new HttpException(
                'product doesnt exist',
                HttpStatus.NOT_FOUND
            )
        }

        Object.assign(product, updateProductDto)

        return this._productRepository.save(product)
    }

    public async deleteProduct(productId: number): Promise<DeleteResult> {
        const product = await this.findProductById(productId)

        if (!product) {
            throw new HttpException(
                'product doesnt exist',
                HttpStatus.NOT_FOUND
            )
        }

        return await this._productRepository.delete(productId)
    }

    public async findAll(query: IQueryForList): Promise<IProductListResponse> {
        const queryBuilder =
            this._productRepository.createQueryBuilder('products')
        const productsCount = await queryBuilder.getCount()

        if (query.limit) {
            queryBuilder.limit(query.limit)
        }

        if (query.offset) {
            queryBuilder.offset(query.offset)
        }

        const products = await queryBuilder.getMany()

        return {
            products: products,
            total: productsCount
        }
    }

    public async findProductById(productId: number): Promise<ProductEntity> {
        return await this._productRepository.findOne({
            where: {
                id: productId
            }
        })
    }

    public buildProductResponse(product: ProductEntity): IProductResponse {
        return {
            product
        }
    }
}
