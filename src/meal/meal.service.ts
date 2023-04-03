import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, In, Repository } from 'typeorm'

import { ProductEntity } from 'src/product/product.entity'
import { CreateMealDto } from './dto/createMeal.dto'
import { UpdateMealDto } from './dto/updateMeal.dto'
import { MealEntity } from './meal.entity'
import { IMealListResponse } from './types/mealListResponse.interface'
import { IMealResponse } from './types/mealResponse.interface'
import { FilterEntity } from 'src/filter/filter.entity'

@Injectable()
export class MealService {
    constructor(
        @InjectRepository(MealEntity)
        private readonly _mealRepository: Repository<MealEntity>,
        @InjectRepository(ProductEntity)
        private readonly _productRepository: Repository<ProductEntity>,
        @InjectRepository(FilterEntity)
        private readonly _filterRepository: Repository<FilterEntity>
    ) {}

    public async createMeal(createMealDto: CreateMealDto): Promise<MealEntity> {
        const meal = new MealEntity()

        Object.assign(meal, createMealDto)

        const products = await this.getProductsByIds(createMealDto.product_list)
        meal.product_list = products

        const filters = await this.getFiltersByIds(createMealDto.filter_list)
        meal.filter_list = filters

        return await this._mealRepository.save(meal)
    }

    public async updateMeal(
        mealId: number,
        updateMealDto: UpdateMealDto
    ): Promise<MealEntity> {
        const meal = await this.findMealById(mealId)

        if (!meal) {
            throw new HttpException('meal doesnt exist', HttpStatus.NOT_FOUND)
        }

        Object.assign(meal, updateMealDto)

        const products = await this.getProductsByIds(updateMealDto.product_list)
        meal.product_list = products

        const filters = await this.getFiltersByIds(updateMealDto.filter_list)
        meal.filter_list = filters

        return await this._mealRepository.save(meal)
    }

    public async deleteMeal(mealId: number): Promise<DeleteResult> {
        const meal = await this.findMealById(mealId)

        if (!meal) {
            throw new HttpException('meal doesnt exist', HttpStatus.NOT_FOUND)
        }

        return await this._mealRepository.delete(mealId)
    }

    public async findAll(query: any): Promise<IMealListResponse> {
        const queryBuilder = this._mealRepository
            .createQueryBuilder('meals')
            .leftJoinAndSelect('meals.product_list', 'products')
            .leftJoinAndSelect('meals.filter_list', 'filters')
        const mealsTotal = await queryBuilder.getCount()

        if (query.limit) {
            queryBuilder.limit(query.limit)
        }

        if (query.offset) {
            queryBuilder.offset(query.offset)
        }

        const meals = await queryBuilder.getMany()

        return {
            meals: meals,
            total: mealsTotal
        }
    }

    public async getProductsByIds(
        products: number[]
    ): Promise<ProductEntity[]> {
        const returnedProducts = await this._productRepository.find({
            where: {
                id: In(products)
            }
        })

        if (returnedProducts.length !== products.length) {
            throw new HttpException(
                'Some of the products you supplied were not found',
                HttpStatus.NOT_FOUND
            )
        }

        return returnedProducts
    }

    public async getFiltersByIds(filters: number[]): Promise<FilterEntity[]> {
        const returnedFilters = await this._filterRepository.find({
            where: {
                id: In(filters)
            }
        })

        if (returnedFilters.length !== filters.length) {
            throw new HttpException(
                'Some of the filters you supplied were not found',
                HttpStatus.NOT_FOUND
            )
        }

        return returnedFilters
    }

    public async findMealById(mealId: number): Promise<MealEntity> {
        return await this._mealRepository.findOne({
            where: {
                id: mealId
            }
        })
    }

    public buildMealResponse(meal: MealEntity): IMealResponse {
        return {
            meal
        }
    }
}
