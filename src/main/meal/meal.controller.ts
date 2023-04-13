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
import { CreateMealDto } from './dto/createMeal.dto'
import { UpdateMealDto } from './dto/updateMeal.dto'
import { MealService } from './meal.service'
import { IMealListResponse } from './types/mealListResponse.interface'
import { IMealResponse } from './types/mealResponse.interface'
import { IQueryForMealList } from './types/queryForMealList.interface'

@Controller('meal')
@UseGuards(MasterGuard)
export class MealController {
    constructor(private readonly _mealService: MealService) {}

    @Post()
    @UsePipes(new ValidationPipe(), new TransformBodyForDtoPipe())
    async createMeal(
        @Body('meal') createMealDto: CreateMealDto
    ): Promise<IMealResponse> {
        const meal = await this._mealService.createMeal(createMealDto)

        return this._mealService.buildMealResponse(meal)
    }

    @Put(':id')
    @UsePipes(new ValidationPipe(), new TransformBodyForDtoPipe())
    async updateMeal(
        @Param('id') mealId: number,
        @Body('meal') updateMealDto: UpdateMealDto
    ): Promise<IMealResponse> {
        const meal = await this._mealService.updateMeal(mealId, updateMealDto)

        return this._mealService.buildMealResponse(meal)
    }

    @Delete(':id')
    async deleteMeal(@Param('id') mealId: number): Promise<DeleteResult> {
        return await this._mealService.deleteMeal(mealId)
    }

    @Get('list')
    async findAll(
        @Query() query: IQueryForMealList
    ): Promise<IMealListResponse> {
        return await this._mealService.findAll(query)
    }
}
