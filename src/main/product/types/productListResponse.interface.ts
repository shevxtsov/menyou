import { ProductEntity } from '../product.entity'

export interface IProductListResponse {
    products: ProductEntity[]
    total: number
}
