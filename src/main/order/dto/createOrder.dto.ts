import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator'
import { ITransformEntityDto } from 'src/shared/types/transformEntityDto.interface'

export class CreateOrderDto implements ITransformEntityDto {
    public readonly allowedProperties: string[] = [
        'name',
        'cooking_time',
        'meal_list'
    ]

    @IsNotEmpty()
    readonly name: string

    readonly cooking_time: number

    @IsArray()
    @ArrayMinSize(1)
    readonly meal_list: number[]
}
