import { Controller, Post, UseGuards } from '@nestjs/common'

import { MasterGuard } from 'src/shared/guards/master.guard'
import { MealService } from './meal.service'

@Controller('meal')
@UseGuards(MasterGuard)
export class MealController {
    constructor(private readonly _mealService: MealService) {}

    @Post()
    createMeal() {
        return this._mealService.createMeal()
    }
}
