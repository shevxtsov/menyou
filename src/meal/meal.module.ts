import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductEntity } from 'src/product/product.entity'
import { MealController } from './meal.controller'
import { MealEntity } from './meal.entity'
import { MealService } from './meal.service'
import { FilterEntity } from 'src/filter/filter.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([MealEntity, ProductEntity, FilterEntity])
    ],
    controllers: [MealController],
    providers: [MealService]
})
export class MealModule {}
