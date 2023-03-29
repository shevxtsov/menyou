import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MealController } from './meal.controller'
import { MealEntity } from './meal.entity'
import { MealService } from './meal.service'

@Module({
    imports: [TypeOrmModule.forFeature([MealEntity])],
    controllers: [MealController],
    providers: [MealService]
})
export class MealModule {}
