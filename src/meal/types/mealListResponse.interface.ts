import { MealEntity } from '../meal.entity'

export interface IMealListResponse {
    meals: MealEntity[]
    total: number
}
