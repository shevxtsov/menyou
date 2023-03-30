import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'

import { CreateMealDto } from './dto/createMeal.dto'
import { UpdateMealDto } from './dto/updateMeal.dto'
import { MealEntity } from './meal.entity'
import { IMealListResponse } from './types/mealListResponse.interface'
import { IMealResponse } from './types/mealResponse.interface'

@Injectable()
export class MealService {
    constructor(
        @InjectRepository(MealEntity)
        private readonly _mealRepository: Repository<MealEntity>
    ) {}

    public async createMeal(createMealDto: CreateMealDto): Promise<MealEntity> {
        const meal = new MealEntity()

        Object.assign(meal, createMealDto)

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
        const queryBuilder = this._mealRepository.createQueryBuilder('meals')
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
